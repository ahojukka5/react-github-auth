# react-github-auth

Description of the authentication process using GitHub OAuth.

First one must create an OAuth App on Github. See instructions [here][1]. As a
result, one should have client id, client secret and redirect uri.

Client id and redirect url can be public and client secret should be, like it's
name suggests, secret.

[1]: https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app

## A short introduction to the authentication process

At first, the user is redirected to GitHub authentication, located at
`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`.

GitHub is asking permissions for the app. After granting access, GitHub will
redirect user to `REDIRECT_URI`. Url contains also query parameter `code`, e.g.
`7cbd65fb78c5c6453058`, which is then exchanged to the token, with the help of
client secret key. If just testing how stuff works, this can be done e.g. curl:

```bash
curl -X POST -H "Content-Type: application/json" \
     -H "Accept: application/json" --data @auth.json \
     https://github.com/login/oauth/access_token
```

where `auth.json` content is:

```json
{
  "client_id": "9137d43268b8e5dfdd48",
  "client_secret": "XXX",
  "code": "7cbd65fb78c5c6453058"
}
```

Here, `client_id` and `client_secret` comes from GitHub App settings.

In practice, one needs to have some backend service where to store the secret
key. It cannot be stored securely inside React app. As a response, one gets
`token`:

```json
{
  "access_token": "YYY",
  "token_type": "bearer",
  "scope": "user"
}
```

User is now authenticated using GitHub. It's possible to access GitHub api to
fetch some user information:

```bash
curl -X GET -H "Content-Type: application/json" \
     -H "Accept: application/json" -H "Authorization: token YYY" \
     https://api.github.com/user
```

Give user information. In this example, user scope was used. According to the
GitHub [article][2], user scope "grants read/write access to profile info only".
For example, `user:email` is granting only access to the all public data already
available from GitHub and in addition to that, email address, which can be used
as a registration process.

[2]: https://docs.github.com/en/free-pro-team@latest/developers/apps/scopes-for-oauth-apps

