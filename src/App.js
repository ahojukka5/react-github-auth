import React, { useEffect, useState } from 'react';

const CLIENT_ID = '9137d43268b8e5dfdd48';
const REDIRECT_URI = 'http://localhost:3000';
const LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
const AUTH_URL = 'http://localhost:8080/authenticate/github';

const useCode = () => {
  const [code, setCode] = useState();
  const url = window.location.href;

  useEffect(() => {
    const re = /[&?]code=(?<code>[a-z0-9]*)/;
    const m = url.match(re);
    if (m) {
      window.history.replaceState('', '', url.replace(re, ''));
      setCode(m.groups.code);
    }
  }, [url]);

  return code;
};

const useUserInfo = (code) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    code &&
      fetch(`${AUTH_URL}?code=${code}`)
        .then((data) => data.json())
        .then((data) => {
          setUserInfo(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [code]);

  return userInfo;
};

const UserInfo = ({ userInfo }) => {
  if (userInfo.token) {
    return (
      <p>
        User is logged in. Welcome, {userInfo.name}, email {userInfo.email}
      </p>
    );
  }

  if (userInfo.error) {
    return (
      <p>
        Failed to log in, error {userInfo.error}: {userInfo.error_description}
      </p>
    );
  }

  return <p>User is not logged in. Press link to log in.</p>;
};

const App = () => {
  const code = useCode();
  const userInfo = useUserInfo(code);

  return (
    <div>
      <p>
        When you click the link, you will be redirected to GitHub authorization
        service and after authorizing app, redirected back to this app.
      </p>
      <a href={LOGIN_URL}>Login using GitHub</a>
      <p>This is the code which you get from GitHub: {code}</p>
      <hr />
      <UserInfo userInfo={userInfo} />
    </div>
  );
};

export default App;
