import React from "react";
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

function App() {

  const [ user, setUser ] = useState({});

 function handleCallbackResponse(response) {
 console.log("Encoded JWT ID token: " + response.credential);
 var userObject = jwt_decode(response.credential);
 console.log(userObject);
 setUser(userObject);
 document.getElementById("signInDiv").hidden = true;
 }

 function handleSignOut(event) {
  setUser({});
  document.getElementById("signInDiv").hidden = false;
 }

useEffect(() => {
 /* global google */
 google.accounts.id.initialize({
   client_id: "482608825630-pdt04qq0teosr1ip171nc4llaput60ne.apps.googleusercontent.com",
   callback: handleCallbackResponse
 });

 google.accounts.id.renderButton(
   document.getElementById("signInDiv"),
   {theme: "outline", size: "large"}
 );

 google.accounts.id.prompt();
}, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {user &&
      <div>
        <img src={user.picture}></img>
        <h3>{user.name}</h3>
        </div>
        }
      {
        Object.keys(user).length != 0 &&
        <button onClick = { (e) => handleSignOut(e)}>로그아웃</button>
      }
    </div>
  );
}

export default App;
