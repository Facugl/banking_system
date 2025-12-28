import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useAuthSession } from './hooks/useAuthSession';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  const { sessionReady, token } = useAuthSession();

  if (token && !sessionReady) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
