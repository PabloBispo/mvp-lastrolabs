import { useState } from 'react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import { SearchIcon } from '../icons/Icons.jsx';
import FilterPanel from './FilterPanel.jsx';

export const EMPTY_FILTERS = { nome: '', cpf: '', exame: '' };

/**
 * Seção "Buscar paciente". Mantém o rascunho dos filtros e só
 * aplica (onSearch) ao clicar em Buscar / pressionar Enter.
 */
export default function SearchCard({ examTypes, onSearch }) {
  const [draft, setDraft] = useState(EMPTY_FILTERS);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(draft);
  };

  return (
    <Card className="mt-12 px-4 py-5 sm:px-7">
      <h2 className="text-base font-semibold text-[#3D3A55]">Buscar paciente</h2>
      <form className="mt-6" onSubmit={handleSubmit}>
        <FilterPanel values={draft} onChange={setDraft} examTypes={examTypes} />
        <div className="mt-4 flex justify-end">
          <Button type="submit" icon={SearchIcon}>
            Buscar
          </Button>
        </div>
      </form>
    </Card>
  );
}
