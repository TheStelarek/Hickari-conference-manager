import React from 'react';
import AuthenticatedApp from 'components/AuthenticatedApp';
import UnauthenticatedApp from 'components/UnauthenticatedApp';
import { auth } from '../api/firebase-user';
import { useAuthState } from 'react-firebase-hooks/auth';

const Root = () => {
  const [user] = useAuthState(auth);
  return <>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</>;
};
export default Root;
