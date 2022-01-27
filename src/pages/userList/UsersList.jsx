import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { usersList } from '../../api/firebase-user';
import emailjs from 'emailjs-com';
import styled from 'styled-components';

function UserList() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_a3op7wn', 'template_kxttcsh', form.current, 'user_BFhEkoC7UGOiZRQsyPuLI').then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  const [userList, setUserList] = useState([]);
  const history = useHistory();

  const getUser = async (id) => {
    history.replace(`/user/${id}`);
  };

  useEffect(async () => {
    setUserList(await usersList());
  }, []);
  return (
    <Container className="login">
      <Box>
        {!!userList.length && (
          <MapContainer>
            {userList.map((d) => {
              return (
                <div key={d.id}>
                  <Form ref={form} onSubmit={sendEmail}>
                    <p>{d.name}</p>
                    <p>{d.email}</p>
                    <p>{d.id}</p>
                    <p>{d.phoneNumber}</p>
                    <Guzik onClick={() => getUser(d.id)}> Details</Guzik>
                  </Form>
                </div>
              );
            })}
          </MapContainer>
        )}
      </Box>
    </Container>
  );
}

export default UserList;

const Guzik = styled.button`
  cursor: pointer;
  display: inline-block;
  color: #000;
  font-size: 16px;
  text-transform: uppercase;
  border: 1px black solid;
  background-color: white;
  border-radius: 12px;
  animation: black 30s linear infinite;
  &:hover {
    animation: black 20s linear infinite;
    background-color: black;
    color: white;
  }
`;

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px black solid;

  border-radius: 12px;
  padding: 10px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1200px;
  margin: auto;
  margin-top: 100px;
  gap: 15px;
  border: 1px lightgray solid;
  background-color: lightgray;
  border-radius: 12px;
  flex-direction: column;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const MapContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 15px;
`;

const Container = styled.div`
  min-height: 95vh;
  height: 100%;
  overflow: auto;
  width: 99.2vw;
  background: linear-gradient(135deg, LightSeaGreen, DarkOrchid, LightSeaGreen);
`;
