import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = ({ onLoginSuccess, onLoginFailure }) => {
  return (
    <GoogleOAuthProvider clientId="579856296590-5bjucpfhm8jnkgb2tombp55lg9tgt9jf.apps.googleusercontent.com">
      <div className="flex justify-center items-center h-screen">
        <GoogleLogin
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
