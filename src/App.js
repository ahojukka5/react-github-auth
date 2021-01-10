import React from 'react';

const CLIENT_ID = '9137d43268b8e5dfdd48';
const REDIRECT_URI = 'http://localhost:3000';
const LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`;

function App() {
  return (
    <div>
      <a href={LOGIN_URL}>Login using GitHub</a>
    </div>
  );
}

export default App;
