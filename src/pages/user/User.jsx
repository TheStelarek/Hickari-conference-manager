import { getUserDetails, updateUser, deleteUser } from 'api/firebase-user';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { isAdminOrUser } from '../../api/permission';

function User(props) {
  const [obj, setObj] = useState({});

  const [adminOrUser, setAdminOrUser] = useState(false);

  useEffect(async () => {
    async function getUser() {
      setObj(await getUserDetails(props.match.params.id));
    }
    getUser();
    setAdminOrUser(await isAdminOrUser(props.match.params.id));
  }, []);
  const update = (e) => setObj((p) => ({ ...p, [e.target.name]: e.target.value }));
  return (
    <Container>
      {obj && (
        <Box>
          <Input type="text" name="adresss" value={obj.adresss} onChange={update} placeholder="Adress" />
          <Input type="text" name="nrpesel" value={obj.nrpesel} onChange={update} placeholder="Pesel" />
          <Input type="text" name="number" value={obj.number} onChange={update} placeholder="Phone Number" />
          <Input type="text" name="username" value={obj.username} onChange={update} placeholder="Username" />
          <Input type="text" name="email" value={obj.email} placeholder="Username" />
          {adminOrUser && (
            <Buttons>
              <Guzik onClick={() => updateUser(obj.adress, obj.pesel, obj.phoneNumber, obj.username, props.match.params.id)}>Update</Guzik>
              <LastGuzik onClick={() => deleteUser(props.match.params.id)}>Delete</LastGuzik>
            </Buttons>
          )}
        </Box>
      )}
    </Container>
  );
}

export default User;

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

const Buttons = styled.div`
  margin-top: 20px;
  padding-top: 20px;
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

const LastGuzik = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 200px;
  height: 50px;
  margin-top: 20px;
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

const Input = styled.input`
  background: transparent;
  position: relative;
  border: none;
  border-bottom: solid 1px gray;
  height: 30px;
  width: 80%;
  z-index: 200;
  padding: 10px;

  font-weight: lighter;
`;
