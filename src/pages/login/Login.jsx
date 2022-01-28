import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../../api/firebase-user';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { Box } from 'components/Box';

const Title = styled.h1`
  color: white;
  padding-top: 25px;
  @media (min-width: 1000px) {
    padding-top: 40px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 80%;
  height: auto;
  margin-top: 30px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const Move = styled.a`
  color: #4c79cd;
  text-decoration: none !important;
  font-size: 13px;
`;

const Button = styled.a`
  background-color: #1f57c1;
  color: white !important;
  transition: all 0.4s ease-in-out;
  justify-content: center;
  display: flex;
  cursor: pointer;
  width: 100%;
  align-items: center;
  height: 30px;
  padding-bottom: 10px;
  padding-top: 10px;
  &:hover {
    background: #fff;
    color: #1f57c1 !important;
  }
`;

const FirstInput = styled.input`
  -webkit-appearance: none;
  margin-top: 30px;
  box-sizing: border-box;
  padding-left: 10px;
  font-size: 14px;
  border: 1px solid #1f57c1;
  color: white;
  background: none;
  height: 50px;
  width: 80%;
  margin: 0;
  transition: 0.3s;
  box-shadow: inset 0 0 0 none;
  padding-bottom: 10px;
  padding-top: 10px;
  ::placeholder {
    color: #bebebe;
  }
`;

const Input = styled.input`
  -webkit-appearance: none;
  margin-top: 30px;
  box-sizing: border-box;
  padding-left: 10px;
  font-size: 14px;
  border: 1px solid #1f57c1;
  color: white;
  background: none;
  height: 50px;
  width: 80%;
  margin: 0;
  transition: 0.3s;
  box-shadow: inset 0 0 0 none;
  padding-bottom: 10px;
  padding-top: 10px;
  ::placeholder {
    color: #bebebe;
  }
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 650px;
  width: 100vw;
  background: black;
  margin-top: 20px;
`;

const Text = styled.div`
  display: flex;
  color: white;
  font-size: 13px;
  padding-bottom: 25px;
  @media (min-width: 1000px) {
    padding-bottom: 40px;
    padding-top: 10px;
  }
`;

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);

  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <Container>
      <Box>
        <Title>Sign in</Title>
        <FirstInput type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your e-mail" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
        <ButtonContainer>
          <Button className="login__btn" onClick={() => signInWithEmailAndPassword(email, password)}>
            Login
          </Button>
        </ButtonContainer>
        <Move href="/reset">Forgot Password</Move>

        <Text>
          Don't have an account?
          <Move href="/register">&#xA0; Register &#xA0; </Move>
          now.
        </Text>
      </Box>
    </Container>
  );
}
