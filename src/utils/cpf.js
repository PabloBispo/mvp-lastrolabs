/** Aplica a máscara 000.000.000-00 enquanto o usuário digita. */
export function maskCpf(value) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export const onlyDigits = (value) => value.replace(/\D/g, '');
