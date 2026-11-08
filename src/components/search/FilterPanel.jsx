import { SlidersIcon } from '../icons/Icons.jsx';
import TextInput from '../ui/TextInput.jsx';
import Select from '../ui/Select.jsx';
import FormField from './FormField.jsx';
import { maskCpf } from '../../utils/cpf.js';

/**
 * Caixa "Filtro" com os campos Nome, CPF e Tipo de exame.
 * `action` (o botão Buscar) entra como última célula da grade:
 * até 1279px → duas linhas (Nome | CPF / Tipo de exame | Buscar);
 * a partir de 1280px → tudo numa linha só.
 */
export default function FilterPanel({ values, onChange, examTypes, action }) {
  const set = (field) => (e) => onChange({ ...values, [field]: e.target.value });

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
        <span className="text-xs font-semibold text-slate-700">Filtro</span>
        <button type="button" aria-label="Opções de filtro" className="text-slate-600 hover:text-lastro-navy">
          <SlidersIcon />
        </button>
      </div>

      <div className="grid gap-x-5 gap-y-4 p-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:p-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.6fr)_auto]">
        <FormField label="Nome" htmlFor="filtro-nome">
          <TextInput id="filtro-nome" placeholder="Paciente" value={values.nome} onChange={set('nome')} />
        </FormField>
        <FormField label="CPF" htmlFor="filtro-cpf">
          <TextInput
            id="filtro-cpf"
            inputMode="numeric"
            placeholder="000.000.000-00"
            maxLength={14}
            value={values.cpf}
            onChange={(e) => onChange({ ...values, cpf: maskCpf(e.target.value) })}
          />
        </FormField>
        <FormField label="Tipo de exame" htmlFor="filtro-exame">
          <Select
            id="filtro-exame"
            placeholder="Ex: Ressonância Magnética"
            options={examTypes}
            value={values.exame}
            onChange={set('exame')}
          />
        </FormField>
        {action && <div className="flex items-end justify-end">{action}</div>}
      </div>
    </div>
  );
}
