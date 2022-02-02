import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  color: white;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 5px;
`;

const Anserw = styled.p`
  font-size: 20px;
  color: lightgray;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const Title = styled.p`
  font-size: 30px;
  color: white;
  display: flex;
  justify-content: center;
`;

function UserForm(props) {
  return (
    <TextContainer>
      <Title>Conference</Title>
      <TextWrapper>
        <Text>Title: </Text>
        <Anserw>{props.title}</Anserw>
      </TextWrapper>
      <TextWrapper>
        <Text>Date:</Text> <Anserw>{props.date}</Anserw>
      </TextWrapper>
      <TextWrapper>
        <Text>Time start:</Text> <Anserw>{props.start}</Anserw>
      </TextWrapper>
      <TextWrapper>
        <Text>Time end:</Text> <Anserw>{props.end}</Anserw>
      </TextWrapper>
      <TextWrapper>
        <Text>Max participants: </Text> <Anserw>{props.maxParticipants}</Anserw>
      </TextWrapper>
      <TextWrapper>
        <Text>Description: </Text> <Anserw>{props.description}</Anserw>
      </TextWrapper>
    </TextContainer>
  );
}

export default UserForm;
