import { useCallback, useEffect, useState } from 'react';

/** Executa uma função assíncrona ao montar e expõe { data, loading, error, reload }. */
export default function useAsync(fn, initialData = null) {
  const [state, setState] = useState({ data: initialData, loading: true, error: null });

  const reload = useCallback(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    fn()
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((error) => active && setState((s) => ({ ...s, loading: false, error })));
    return () => {
      active = false;
    };
  }, [fn]);

  useEffect(() => reload(), [reload]);

  return { ...state, reload };
}
