import { ChevronDownIcon } from '../icons/Icons.jsx';
import { FIELD_CLASSES } from './TextInput.jsx';

/**
 * Select estilizado com seta própria.
 * `placeholder` vira a primeira opção (valor vazio) e aparece em itálico/cinza.
 */
export default function Select({ options, placeholder, value, className = '', selectClassName = FIELD_CLASSES, ...props }) {
  const isEmpty = value === '' || value == null;
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        className={`w-full appearance-none pr-8 ${selectClassName} ${isEmpty && placeholder ? 'italic text-slate-400' : ''}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const { value: v, label } = typeof opt === 'object' ? opt : { value: opt, label: opt };
          return (
            <option key={v} value={v} className="not-italic text-slate-700">
              {label}
            </option>
          );
        })}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
    </div>
  );
}
