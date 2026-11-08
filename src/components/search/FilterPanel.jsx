import { SlidersIcon } from '../icons/Icons.jsx';
import TextInput from '../ui/TextInput.jsx';
import Select from '../ui/Select.jsx';
import FormField from './FormField.jsx';
import { maskCpf } from '../../utils/cpf.js';

/** Caixa "Filtro" com os campos Nome, CPF e Tipo de exame. */
export default function FilterPanel({ values, onChange, examTypes }) {
  const set = (field) => (e) => onChange({ ...values, [field]: e.target.value });

  return (
    <div className="max-w-[776px] rounded-md border border-slate-200 bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
        <span className="text-xs font-semibold text-slate-700">Filtro</span>
        <button type="button" aria-label="Opções de filtro" className="text-slate-600 hover:text-lastro-navy">
          <SlidersIcon />
        </button>
      </div>

      <div className="space-y-4 px-6 py-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <FormField label="Nome" htmlFor="filtro-nome" labelClassName="w-10">
            <TextInput
              id="filtro-nome"
              placeholder="Paciente"
              value={values.nome}
              onChange={set('nome')}
              className="min-w-0 flex-1 sm:max-w-[404px]"
            />
          </FormField>
          <FormField label="CPF" htmlFor="filtro-cpf" labelClassName="sm:ml-2">
            <TextInput
              id="filtro-cpf"
              inputMode="numeric"
              placeholder="000.000.000-00"
              maxLength={14}
              value={values.cpf}
              onChange={(e) => onChange({ ...values, cpf: maskCpf(e.target.value) })}
              className="w-[116px]"
            />
          </FormField>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <FormField label="Tipo de exame" htmlFor="filtro-exame">
            <Select
              id="filtro-exame"
              placeholder="Ex: Ressonância Magnética"
              options={examTypes}
              value={values.exame}
              onChange={set('exame')}
              className="min-w-0 flex-1 sm:max-w-[401px]"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
