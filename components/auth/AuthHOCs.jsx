import { useRouter } from 'next/router';

import Loading from '../common/Loading';
import useAuth from '../../lib/hooks/useAuth';

const authRedirect = ({ requiredAuthState, redirectUrl, Component }) => {
  const RedirectWrapper = (props) => {
    const router = useRouter();
    const { authState } = useAuth();

    if (authState.loading) {
      return <Loading />;
    }

    if (
      typeof window !== 'undefined' &&
      requiredAuthState !== authState.user.authenticated
    ) {
      router.push(redirectUrl);
    }

    return <Component {...props} />;
  };

  return RedirectWrapper;
};

export const WithAuth = (Component, redirectUrl = '/account/login') => {
  return authRedirect({ Component, redirectUrl, requiredAuthState: true });
};

export const NoAuth = (Component, redirectUrl = '/') => {
  return authRedirect({ Component, redirectUrl, requiredAuthState: false });
};
