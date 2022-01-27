import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { auth, registerWithEmailAndPassword } from '../../api/firebase-user.js';

const Container = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 95vh;
  width: 100vw;
  background: linear-gradient(135deg, LightSeaGreen, DarkOrchid, LightSeaGreen);
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 89%;
  gap: 15px;
  border: 1px lightgray solid;
  background-color: lightgray;
  border-radius: 12px;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  gap: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 60%;
  height: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 600% 50%;
  }
`;

const Guzik = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 200px;
  height: 50px;
  font-weight: 200;
  font-size: 14pt;
  background: linear-gradient(to right, Tomato, DarkOrange, Crimson, Tomato);
  background-size: 600% 600%;
  border: 1px solid transparent;
  animation: ${gradient} 30s linear infinite;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
    rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
  &:hover {
    background: linear-gradient(to right, CornflowerBlue, Aqua, DeepPink, CornflowerBlue);
    background-size: 600% 600%;
    animation: ${gradient} 20s linear infinite;
    filter: drop-shadow(0px 0px 30px CornflowerBlue);
    font-weight: 400;
    text-shadow: 0px 0px 3px CornflowerBlue;
  }
`;

const PierwszePole = styled.input`
  background: transparent;
  border: none;
  border-bottom: solid 1px gray;
  height: 30px;
  width: 80%;
  z-index: 200;
  padding: 10px;
  font-size: 20px;
  font-weight: lighter;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: solid 1px gray;
  height: 30px;
  width: 80%;
  z-index: 200;
  padding: 10px;
  font-size: 20px;
  font-weight: lighter;
`;

const Tekst = styled.div`
  margin-bottom: 50px;
`;

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setName] = useState('');
  const [phoneNumber, setNumber] = useState('');
  const [adress, setAdress] = useState('');
  const [pesel, setPesel] = useState('');

  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  const register = () => {
    if (!displayName) alert('Please enter name');
    registerWithEmailAndPassword(displayName, email, password, phoneNumber, adress, pesel);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history.replace('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <Container>
      <Box>
        <h1>Register</h1>
        <Wrapper>
          <PierwszePole type="text" value={displayName} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
          <Input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Input
            type="text"
            className="register__textBox"
            value={phoneNumber}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Number phone"
          />
          <Input type="text" className="register__textBox" value={adress} onChange={(e) => setAdress(e.target.value)} placeholder="Address" />
          <Input type="text" className="register__textBox" value={pesel} onChange={(e) => setPesel(e.target.value)} placeholder="Pesel" />
        </Wrapper>
        <ButtonContainer>
          <Guzik onClick={register}>Zaloz konto</Guzik>
        </ButtonContainer>
        <Tekst>
          Already have an account? <Link to="/login">Login</Link> now.
        </Tekst>
      </Box>
    </Container>
  );
}
export default Signup;
