import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getConferencesList } from 'api/firebase-conference';
import styled from 'styled-components';

function ConverenceList() {
  const [confList, setConfList] = useState([]);
  const history = useHistory();

  const getConference = async (conf) => {
    history.replace(`/conference/${conf}`);
  };

  useEffect(() => {
    const getConference = async () => {
      const conferences = await getConferencesList();
      setConfList(conferences);
    };
    getConference();
  }, []);

  return (
    <Container>
      <Box>
        {confList && confList.length > 0 && (
          <MapContainer>
            {confList.map((details) => (
              <Form key={details.id}>
                <Text>Title: {details.title}</Text>
                <Text>Author: {details.author}</Text>
                <Text>Date: {details.date}</Text>
                <Text>Starts at: {details.start}</Text>
                <Text>Ends at: {details.end}</Text>
                <Buttons>
                  <Button onClick={() => getConference(details.id)}>Details</Button>
                </Buttons>
              </Form>
            ))}
          </MapContainer>
        )}
      </Box>
    </Container>
  );
}

export default ConverenceList;

const Button = styled.button`
  cursor: pointer;
  display: inline-block;
  color: #000;
  font-size: 16px;
  text-transform: uppercase;
  padding: 11px 20px;
  border: 1px black solid;
  background-color: white;
  animation: black 30s linear infinite;
  &:hover {
    animation: black 20s linear infinite;
    background-color: black;
    color: white;
  }
`;

const Text = styled.p`
  color: white;
  padding-left: 32px;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Form = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px gray solid;
  border-radius: 12px;
  padding: 10px;
  background-color: black;
  @media (min-width: 1000px) {
    width: 300px;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: auto;
  margin-top: 20px;
  gap: 305px;
  border: 1px lightgray solid;
  background-color: #1a1a1a;
  border-radius: 12px;
  flex-direction: column;
  margin-bottom: 60px;
  @media (min-width: 1000px) {
    width: 800px;
  }
`;

const MapContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 10px;
`;

const Container = styled.div`
  height: 100%;
  overflow: auto;
  width: 99vw;
`;
