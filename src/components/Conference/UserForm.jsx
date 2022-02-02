import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  color: white;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 5px;
`;

const SubText = styled.p`
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
        <SubText>{props.title}</SubText>
      </TextWrapper>
      <TextWrapper>
        <Text>Date:</Text> <SubText>{props.date}</SubText>
      </TextWrapper>
      <TextWrapper>
        <Text>Time start:</Text> <SubText>{props.start}</SubText>
      </TextWrapper>
      <TextWrapper>
        <Text>Time end:</Text> <SubText>{props.end}</SubText>
      </TextWrapper>
      <TextWrapper>
        <Text>Max participants: </Text> <SubText>{props.maxParticipants}</SubText>
      </TextWrapper>
      <TextWrapper>
        <Text>Description: </Text> <SubText>{props.description}</SubText>
      </TextWrapper>
    </TextContainer>
  );
}

export default UserForm;
