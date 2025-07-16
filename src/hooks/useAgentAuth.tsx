import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAgentAuth(options?: { redirectToLogin?: boolean }) {
  const navigate = useNavigate();
  const code = localStorage.getItem('agent_access_code');
  const isAgentAuthenticated = code === 'AGENT-2024';

  useEffect(() => {
    if (options?.redirectToLogin && !isAgentAuthenticated) {
      navigate('/agent/login');
    }
  }, [isAgentAuthenticated, navigate, options]);

  const logout = () => {
    localStorage.removeItem('agent_access_code');
    navigate('/agent/login');
  };

  return { isAgentAuthenticated, logout };
} 