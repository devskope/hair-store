const transformApiError = (error) => {
  const errors = error?.graphQLErrors.map((error) => {
    const errorData = error.extensions?.exception?.data?.message;

    if (errorData) {
      return errorData
        .reduce((errors, errorInfo) => {
          const messages = errorInfo?.messages?.map((error) => error.message);
          return [...errors, ...messages];
        }, [])
        .flat();
    }

    return error.message;
  });

  return errors?.flat() || [error?.message];
};

export default transformApiError;
