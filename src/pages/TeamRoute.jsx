import AppLayout from '../components/layout/AppLayout.jsx';
import useAsync from '../hooks/useAsync.js';
import { api } from '../mocks/api.js';
import TeamPage from './TeamPage.jsx';

export default function TeamRoute({ route }) {
  const doctor = useAsync(api.getDoctor);
  return (
    <AppLayout doctor={doctor.data} route={route}>
      <TeamPage />
    </AppLayout>
  );
}
