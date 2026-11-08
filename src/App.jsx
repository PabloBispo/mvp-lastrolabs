import { useState } from 'react';
import AppLayout from './components/layout/AppLayout.jsx';
import PageHeader from './components/layout/PageHeader.jsx';
import SearchCard from './components/search/SearchCard.jsx';
import Card from './components/ui/Card.jsx';
import ConfirmDialog from './components/ui/ConfirmDialog.jsx';
import { useToast } from './components/ui/Toast.jsx';
import PatientsTable from './components/patients/PatientsTable.jsx';
import PatientFormModal from './components/patients/PatientFormModal.jsx';
import UploadLaudoModal from './components/patients/UploadLaudoModal.jsx';
import PatientCardList from './components/patients/PatientCardList.jsx';
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
  const [uploading, setUploading] = useState(null);
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

  const handleSendLaudo = (patient, evidencia) =>
    run(() => p.enviarLaudo(patient.id, evidencia), `Laudo de ${patient.nome} enviado para análise`)();

  const handleSave = run(p.update, 'Paciente atualizado');
  const handleDelete = run(() => p.remove(deleting.id), 'Paciente excluído');
  const handleReset = run(async () => {
    await api.resetDemo();
    doctor.reload();
    examTypes.reload();
    p.reload();
  }, 'Dados restaurados');

  // Props comuns à tabela (desktop) e à lista de cartões (celular/tablet).
  const listProps = {
    patients: p.pageItems,
    loading: p.loading,
    skeletonCount: p.pageSize,
    sendingIds: p.sendingIds,
    sort: p.sort,
    columnFilters: p.columnFilters,
    onColumnFiltersChange: p.setColumnFilters,
    onEnviar: setUploading,
    onEdit: setEditing,
    onDelete: setDeleting,
  };

  return (
    <AppLayout doctor={doctor.data} onSettings={() => setConfirmReset(true)}>
      <PageHeader
        title="Espaço do Médico"
        subtitle="Localizar paciente, enviar laudo, acompanhar gestão de envio de forma rápida"
      />

      <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-6 lg:mt-8">
      <SearchCard examTypes={examTypes.data} onSearch={p.search} />

      <Card className="p-4 lg:p-6">
        {/* Tabela a partir de 1024px; cartões abaixo disso. */}
        <div className="hidden lg:block">
          <PatientsTable
            {...listProps}
            onSortChange={p.toggleSort}
          />
        </div>
        <div className="lg:hidden">
          <PatientCardList {...listProps} onSortSet={p.setSort} />
        </div>
        <Pagination
          page={p.page}
          totalPages={p.totalPages}
          totalCount={p.totalCount}
          onPageChange={p.setPage}
          pageSize={p.pageSize}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          onPageSizeChange={p.setPageSize}
        />
      </Card>
      </div>

      <PatientFormModal
        patient={editing}
        examTypes={examTypes.data}
        onSave={handleSave}
        onClose={() => setEditing(null)}
      />

      <UploadLaudoModal patient={uploading} onSend={handleSendLaudo} onClose={() => setUploading(null)} />

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
        message="Todas as alterações feitas (laudos enviados e edições) serão desfeitas."
        confirmLabel="Restaurar"
        onConfirm={handleReset}
        onClose={() => setConfirmReset(false)}
      />
    </AppLayout>
  );
}
