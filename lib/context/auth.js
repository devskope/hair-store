import { GraphQLClient } from 'graphql-request';
import { createContext, useEffect, useReducer } from 'react';

import { CURRENT_USER } from '../graphql/queries/users';

export const AuthContext = createContext();

const graphQLClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPONT,
  {
    credentials: 'include',
    mode: 'cors',
  }
);

const initialUserState = { authenticated: false, data: null };

const authCtxState = {
  loading: true,
  user: initialUserState,
};

const authCtxReducer = (state, action) => {
  switch (action.type) {
    case 'loading': {
      return { ...state, loading: action.value };
    }
    case 'user': {
      return { ...state, user: action.value };
    }
    default:
      break;
  }
};

export const AuthProvider = ({ children, refresh }) => {
  const [authState, authDispatch] = useReducer(authCtxReducer, authCtxState);

  useEffect(() => {
    const auth = async () => {
      authDispatch({ type: 'loading', value: true });

      try {
        const data = await graphQLClient.request(CURRENT_USER);

        if (data?.me) {
          authDispatch({
            type: 'user',
            value: { authenticated: true, data: data.me },
          });
        } else authDispatch({ type: 'user', value: initialUserState });
      } catch (error) {
        authDispatch({ type: 'user', value: initialUserState });
      }

      authDispatch({ type: 'loading', value: false });
    };

    auth();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
