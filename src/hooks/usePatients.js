import { useEffect, useMemo, useState } from 'react';
import { EMPTY_FILTERS } from '../components/search/SearchCard.jsx';
import { normalize } from '../utils/text.js';
import { onlyDigits } from '../utils/cpf.js';
import { api } from '../mocks/api.js';
import useAsync from './useAsync.js';

const laudoLabel = (p) => (p.enviado ? 'Enviado' : 'Enviar');
const SORT_VALUE = { exame: (p) => p.exame, laudo: laudoLabel, status: (p) => p.status };

/**
 * Estado e regras da lista de pacientes: carrega da API mock e cuida de
 * busca, filtros de coluna, ordenação, paginação e ações.
 */
export default function usePatients({ initialPageSize = 4 } = {}) {
  const { data, loading, error, reload } = useAsync(api.listPatients, []);
  const [patients, setPatients] = useState([]);
  const [sendingIds, setSendingIds] = useState([]);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [columnFilters, setColumnFilters] = useState({ laudo: [], status: [] });
  const [sort, setSort] = useState({ key: null, dir: null });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => setPatients(data), [data]);

  const visible = useMemo(() => {
    const nome = normalize(filters.nome.trim());
    const cpf = onlyDigits(filters.cpf);
    let list = patients.filter(
      (p) =>
        (!nome || normalize(p.nome).includes(nome)) &&
        (!cpf || onlyDigits(p.cpf).startsWith(cpf)) &&
        (!filters.exame || p.exame === filters.exame) &&
        (columnFilters.laudo.length === 0 || columnFilters.laudo.includes(laudoLabel(p))) &&
        (columnFilters.status.length === 0 || columnFilters.status.includes(p.status)),
    );
    if (sort.key) {
      const get = SORT_VALUE[sort.key];
      const factor = sort.dir === 'desc' ? -1 : 1;
      list = [...list].sort((a, b) => get(a).localeCompare(get(b), 'pt-BR') * factor);
    }
    return list;
  }, [patients, filters, columnFilters, sort]);

  const totalPages = Math.max(1, Math.ceil(visible.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = visible.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const replace = (updated) => setPatients((list) => list.map((p) => (p.id === updated.id ? updated : p)));

  return {
    loading,
    error,
    reload,
    pageItems,
    totalCount: visible.length,
    page: currentPage,
    totalPages,
    pageSize,
    sort,
    columnFilters,
    sendingIds,
    setPage,
    search: (f) => {
      setFilters(f);
      setPage(1);
    },
    setColumnFilters: (cf) => {
      setColumnFilters(cf);
      setPage(1);
    },
    setPageSize: (n) => {
      setPageSize(n);
      setPage(1);
    },
    setSort,
    toggleSort: (key) =>
      setSort((s) =>
        s.key !== key ? { key, dir: 'asc' } : s.dir === 'asc' ? { key, dir: 'desc' } : { key: null, dir: null },
      ),

    async enviarLaudo(id) {
      setSendingIds((ids) => [...ids, id]);
      try {
        replace(await api.sendReport(id));
      } finally {
        setSendingIds((ids) => ids.filter((x) => x !== id));
      }
    },
    async update(id, changes) {
      replace(await api.updatePatient(id, changes));
    },
    async remove(id) {
      await api.deletePatient(id);
      setPatients((list) => list.filter((p) => p.id !== id));
    },
  };
}
