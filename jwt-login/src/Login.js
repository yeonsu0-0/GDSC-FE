import React from "react";
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

const CLIENT_ID = "482608825630-pdt04qq0teosr1ip171nc4llaput60ne.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/drive";

function App() {

  const [ user, setUser ] = useState({});
  const [ tokenClient, setTokenClient] = useState({}); 

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

 function createDriveFile() {
  tokenClient.requestAccessToken();
 }

useEffect(() => {
 /* global google */
 const google = window.google;
 google.accounts.id.initialize({
   client_id: CLIENT_ID,
   callback: handleCallbackResponse
 });

 google.accounts.id.renderButton(
   document.getElementById("signInDiv"),
   {theme: "outline", size: "large"}
 );

 // Access Tokens
 // google drive에 업로드

 // tokenClient
 setTokenClient(
 google.accounts.oauth2.initTokenClient ({
  client_id: CLIENT_ID,
  scope: SCOPES,
  callback: (tokenResponse) => {
  console.log(tokenResponse);
  if(tokenResponse && tokenResponse.access_token) {
    fetch("https://www.googleapis.com/drive/v3/files", {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer $(tokenResponse.access_token)`
      },
      body: JSON.stringify({"name": "Yeonsu Codes File", "mimeType":"text/plain"})
    })
  }
  }
 })
 );
// tokenClient.requestAccessToken();

 google.accounts.id.prompt();
}, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {user &&
      <div>
        <img src={user.picture}></img>
        <h3>{user.name}</h3>
        <input type="submit" onClick={createDriveFile} value="Create File"/>
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
