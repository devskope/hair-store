import { useContext } from 'react';

import { AuthContext } from '../context/auth';

export default () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be within AuthProvider');
  }

  return authContext;
};
