import React from 'react';
import styled from 'styled-components';

const Title = styled.p`
  font-size: 30px;
  color: white;
  display: flex;
  justify-content: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
`;

const Text = styled.p`
  color: white;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 5px;
`;

const InputText = styled.input`
  -webkit-appearance: none;
  box-sizing: border-box;
  font-size: 14px;
  border: 1px solid black;
  color: white;
  background: none;
  height: 30px;
  transition: 0.3s;
  box-shadow: inset 0 0 0 none;
  ::placeholder {
    color: #bebebe;
  }
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

function AdminForm(props) {
  return (
    <TextContainer>
      <Title>Conference</Title>
      <TextWrapper>
        <Text>Date:</Text>
        <InputText type="text" className="login__textBox" name="title" value={props.title} onChange={props.update} placeholder="Title" />
      </TextWrapper>
      <TextWrapper>
        <Text>Date:</Text>
        <InputText type="date" className="login__textBox" name="date" value={props.date} onChange={props.update} placeholder="Date" />
      </TextWrapper>
      <TextWrapper>
        <Text>Start:</Text>
        <InputText
          type="time"
          className="login__textBox"
          name="start"
          value={props.start}
          onChange={props.update}
          placeholder="Conference start at"
        />
      </TextWrapper>
      <TextWrapper>
        <Text>End:</Text>
        <InputText type="time" className="login__textBox" name="end" value={props.end} onChange={props.update} placeholder="Conference end at" />
      </TextWrapper>
      <TextWrapper>
        <Text>Max participiants:</Text>
        <InputText
          type="number"
          className="login__textBox"
          name="maxParticipants"
          value={props.maxParticipants}
          onChange={props.update}
          placeholder="Conference end at"
        />
      </TextWrapper>
      <TextWrapper>
        <Text>description:</Text>
        <InputText
          type="textarea"
          className="login__textBox"
          name="description"
          value={props.description}
          onChange={props.update}
          placeholder="Conference end at"
        />
      </TextWrapper>
    </TextContainer>
  );
}

export default AdminForm;
