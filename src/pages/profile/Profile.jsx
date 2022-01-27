import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { auth } from '../../api/firebase-user';
import { useAuthState } from 'react-firebase-hooks/auth';
import { usersList } from '../../api/firebase-user';
import { isAdmin } from '../../api/permission';

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  gap: 30px;
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

const TekstContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tekst = styled.a`
  font-size: 20px;
`;
const Gorny = styled.a`
  font-size: 20px;
  font-weight: 800;
`;

const Reset = () => {
  const [user] = useAuthState(auth);
  const [userList, setUserList] = useState([]);

  const [admin, setAdmin] = useState(false);

  useEffect(async () => {
    setUserList(await usersList());
    setAdmin(await isAdmin());
  }, []);

  return (
    <Container>
      <Box>
        {userList.map((record) => {
          if (record.email === user.email)
            return (
              <Wrapper>
                <TekstContainer>
                  <Gorny>Nazwa:</Gorny>
                  <Tekst>{record.username}</Tekst>
                </TekstContainer>
                <TekstContainer>
                  <Gorny>Email:</Gorny>
                  <Tekst>{record.email}</Tekst>
                </TekstContainer>
                <TekstContainer>
                  <Gorny>Numer telefonu:</Gorny>
                  <Tekst>{record.number}</Tekst>
                </TekstContainer>
                <TekstContainer>
                  <Gorny>Adres:</Gorny>
                  <Tekst>{record.adresss}</Tekst>
                </TekstContainer>
                <TekstContainer>
                  <Gorny>Adres:</Gorny>
                  <Tekst>{record.nrpesel}</Tekst>
                </TekstContainer>
                {admin && <Guzik href="/files">Upload files</Guzik>}
              </Wrapper>
            );

          return null;
        })}
      </Box>
    </Container>
  );
};

export default Reset;
