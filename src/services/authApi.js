import api from './api';

export async function signIn(authObj) {
  if(authObj.code)
  {
    console.log("Login with code");
    const code = authObj.code;
    const response = await api.post('/auth/sign-in-github', {code});
    return response.data;
  }
  if(authObj.email && authObj.password)
  {
    console.log("Login with mail and password");
    const email = authObj.email;
    const password = authObj.password;
    const response = await api.post('/auth/sign-in', { email, password });
    return response.data;
  }
}

