import React, { useState } from 'react';
import styled from 'styled-components';
import { sendPasswordResetEmail } from '../../api/firebase-user';
import { Box } from 'components/Box';

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

const InputText = styled.input`
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
  padding-bottom: 20px;
`;

const Reset = () => {
  const [email, setEmail] = useState('');

  return (
    <Container>
      <Box>
        <Title> Reset Password </Title>
        <InputText type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your e-mail" />
        <ButtonContainer>
          <Button onClick={() => sendPasswordResetEmail(email)}>Reset</Button>
        </ButtonContainer>
      </Box>
    </Container>
  );
};

export default Reset;
