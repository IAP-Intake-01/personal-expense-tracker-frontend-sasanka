import * as React from 'react';
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import { Account } from '@toolpad/core/Account';
import { useNavigate } from 'react-router-dom';

const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};

export default function SigneOut() {
  const [session, setSession] = React.useState(demoSession);
  const navigate = useNavigate();
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        localStorage.removeItem('expense-tracker-token');
        setSession(null);
        navigate('login');
      },
    };
  }, [navigate]);

  return (
    <AuthenticationContext.Provider value={authentication}>
      <SessionContext.Provider value={session}>
        {/* preview-start */}
        <Account />
        {/* preview-end */}
      </SessionContext.Provider>
    </AuthenticationContext.Provider>
  );
}
