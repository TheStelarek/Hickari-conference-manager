import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../api/firebase-user';
import { useAuthState } from 'react-firebase-hooks/auth';
import { usersList } from '../../api/firebase-user';
import { isAdmin } from '../../api/permission';
import UploadFile from 'pages/uploadFile/UploadFile';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  background: black;
`;

const Box = styled.div`
  display: flex;
  align-items: flex-start;
  width: 300px;
  height: 250px;
  gap: 15px;
  border: 1px lightgray solid;
  background-color: #1a1a1a;
  border-radius: 12px;
  flex-direction: row;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  @media (min-width: 1000px) {
    width: 600px;
  }
`;

const UploadBox = styled(Box)`
  height: auto;
  position: static;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 5px;
  padding-right: 5px;
  gap: 30px;
  margin-bottom: 40px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 20px;
`;

const SubText = styled.a`
  font-size: 20px;
  color: white;
  padding-left: 20px;
`;
const Text = styled.a`
  font-size: 15px;
  font-weight: 600;
  text-align: justify;
  color: #737373;
`;

const Reset = () => {
  const [user] = useAuthState(auth);
  const [userList, setUserList] = useState([]);

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const getAdminAndUser = async () => {
      const adminList = await isAdmin();
      setAdmin(adminList);
      const userList = await usersList();
      setUserList(userList);
    };

    getAdminAndUser();
  }, []);

  return (
    <Container>
      <Box>
        {userList.map((record) => {
          if (record.email === user.email)
            return (
              <Wrapper>
                <TextContainer>
                  <Text>Nazwa:</Text>
                  <SubText>{record.username}</SubText>
                </TextContainer>
                <TextContainer>
                  <Text>Email:</Text>
                  <SubText>{record.email}</SubText>
                </TextContainer>
                <TextContainer>
                  <Text>Numer telefonu:</Text>
                  <SubText>{record.number}</SubText>
                </TextContainer>
                <TextContainer>
                  <Text>Adres:</Text>
                  <SubText>{record.adresss}</SubText>
                </TextContainer>
                <TextContainer>
                  <Text>Numer pesel:</Text>
                  <SubText>{record.nrpesel}</SubText>
                </TextContainer>
              </Wrapper>
            );

          return null;
        })}
      </Box>
      {admin && (
        <UploadBox>
          <UploadFile />
        </UploadBox>
      )}
    </Container>
  );
};

export default Reset;
