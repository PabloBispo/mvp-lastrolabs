import { useState } from 'react';
import AppLayout from './components/layout/AppLayout.jsx';
import PageHeader from './components/layout/PageHeader.jsx';
import SearchCard from './components/search/SearchCard.jsx';
import Card from './components/ui/Card.jsx';
import ConfirmDialog from './components/ui/ConfirmDialog.jsx';
import { useToast } from './components/ui/Toast.jsx';
import PatientsTable from './components/patients/PatientsTable.jsx';
import PatientFormModal from './components/patients/PatientFormModal.jsx';
import Pagination from './components/pagination/Pagination.jsx';
import usePatients from './hooks/usePatients.js';
import useAsync from './hooks/useAsync.js';
import { api } from './mocks/api.js';

const PAGE_SIZE_OPTIONS = [4, 10, 20];

export default function App() {
  const notify = useToast();
  const doctor = useAsync(api.getDoctor);
  const examTypes = useAsync(api.getExamTypes, []);
  const p = usePatients({ initialPageSize: PAGE_SIZE_OPTIONS[0] });

  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);

  // Envolve uma ação da API mock com aviso de sucesso/erro.
  const run = (action, successMessage) => async (...args) => {
    try {
      await action(...args);
      notify(successMessage);
    } catch (err) {
      notify(err.message || 'Algo deu errado', 'error');
      throw err;
    }
  };

  const handleEnviar = (patient) =>
    run(() => p.enviarLaudo(patient.id), `Laudo de ${patient.nome} enviado`)().catch(() => {});

  const handleSave = run(p.update, 'Paciente atualizado');
  const handleDelete = run(() => p.remove(deleting.id), 'Paciente excluído');
  const handleReset = run(async () => {
    await api.resetDemo();
    doctor.reload();
    examTypes.reload();
    p.reload();
  }, 'Dados restaurados');

  return (
    <AppLayout doctor={doctor.data} onSettings={() => setConfirmReset(true)}>
      <PageHeader
        title="Espaço do Médico"
        subtitle="Localizar paciente, enviar laudo, acompanhar gestão de envio de forma rápida"
      />

      <SearchCard examTypes={examTypes.data} onSearch={p.search} />

      <Card className="mt-9 rounded-xl p-4">
        <PatientsTable
          patients={p.pageItems}
          loading={p.loading}
          skeletonCount={p.pageSize}
          sendingIds={p.sendingIds}
          sort={p.sort}
          onSortChange={p.toggleSort}
          columnFilters={p.columnFilters}
          onColumnFiltersChange={p.setColumnFilters}
          onEnviar={handleEnviar}
          onEdit={setEditing}
          onDelete={setDeleting}
        />
        <Pagination
          page={p.page}
          totalPages={p.totalPages}
          onPageChange={p.setPage}
          pageSize={p.pageSize}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          onPageSizeChange={p.setPageSize}
        />
      </Card>

      <PatientFormModal
        patient={editing}
        examTypes={examTypes.data}
        onSave={handleSave}
        onClose={() => setEditing(null)}
      />

      <ConfirmDialog
        open={!!deleting}
        title="Excluir paciente"
        message={deleting && `Tem certeza que deseja excluir ${deleting.nome}?`}
        confirmLabel="Excluir"
        onConfirm={handleDelete}
        onClose={() => setDeleting(null)}
      />

      <ConfirmDialog
        open={confirmReset}
        title="Restaurar dados iniciais"
        message="Todas as alterações feitas (laudos enviados, edições e exclusões) serão desfeitas."
        confirmLabel="Restaurar"
        onConfirm={handleReset}
        onClose={() => setConfirmReset(false)}
      />
    </AppLayout>
  );
}
