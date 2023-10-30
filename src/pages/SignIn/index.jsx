import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';


import qs from "query-string";
import axios from 'axios';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn} = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();
  
  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn({email : email, password : password});
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  function redirectToGitHub() {

    const GITHUB_URL = 'http://github.com/login/oauth/authorize';
    const params = {
      response_type: 'code',
      scope: 'user',
      client_id: import.meta.env.VITE_API_GITHUB_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_API_GITHUB_REDIRECT_URL
    }
    const queryStrings = qs.stringify(params);
    const authURL = `${GITHUB_URL}?${queryStrings}`;
    window.location.href = authURL;
  }

  window.onload = async () => {
    const url = new URL(window.location.href);
    const code = url.search.split('=')[1]
    if(code) {
      console.log("Code from Github");

      try {
        const userData = await signIn({code});
        setUserData(userData);
        toast('Login realizado com sucesso!');
        navigate('/dashboard');
      } catch (err) {
        toast('Não foi possível fazer o login!')
        console.log("err", err);
      }
    }
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
          <Button color="primary" fullWidth onClick={redirectToGitHub}> Entrar com GitHub</Button>
        </form>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
