import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";




const GoogleLoginButton = () => {
  return (
    <GoogleOAuthProvider clientId='482608825630-pdt04qq0teosr1ip171nc4llaput60ne.apps.googleusercontent.com'>
      
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />

    </GoogleOAuthProvider>
  );
};


export default GoogleLoginButton;