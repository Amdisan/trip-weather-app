import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUser } from './context/UserContext';
import Login from './pages/Login/Login';
import AppLayout from './ui/AppLayout/AppLayout';
import Home from './pages/Home/Home';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const { profile } = useUser();

  if (profile?.email) {
    return (
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <Home />
        </AppLayout>
      </QueryClientProvider>
    );
  } else {
    return <Login />;
  }
}

export default App;
