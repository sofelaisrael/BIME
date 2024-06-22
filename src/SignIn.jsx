import React from 'react';
import { auth, provider } from './firebase';

const SignIn = ({ setUser }) => {
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider).then(result => {
      setUser(result.user);
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
