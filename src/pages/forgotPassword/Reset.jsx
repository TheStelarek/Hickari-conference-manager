import React, { useState } from 'react';
import styled from 'styled-components';
import { sendPasswordResetEmail } from '../../api/firebase-user';
const Container = styled.div`
  background-color: #ffc0cb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  border: 3px green solid;
  flex-direction: column;
`;

const Guzik = styled.button`
  margin-top: 3%;
  margin-bottom: 30px;
  background-color: #ffc0cb;
  width: 200px;
  height: 40px;
  border: green 2px solid;
  color: green;
  font-size: 20px;
`;

const PierwszePole = styled.input`
  background-color: #ffc0cb;
  width: 200px;
  height: 40px;
  margin-top: -30px;
  border-color: gray;
`;

const Tytul = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  font-size: 40px;
  transform: translateY(-100px);
  color: green;
`;

const Reset = () => {
  const [email, setEmail] = useState('');

  return (
    <Container>
      <Wrapper>
        <Tytul> RECOVERY PASSWORD </Tytul>
        <PierwszePole type="text" className="login__textBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
        <Guzik className="login__btn" onClick={() => sendPasswordResetEmail(email)}>
          reset
        </Guzik>
      </Wrapper>
    </Container>
  );
};

export default Reset;
