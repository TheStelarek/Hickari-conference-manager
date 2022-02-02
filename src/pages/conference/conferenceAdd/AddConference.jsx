import React, { useState } from 'react';
import { addConference } from 'api/firebase-conference';
import styled from 'styled-components';

function AddConference() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');
  const [maxCount, setMaxCount] = useState('');

  //-------------------------------------------------------------------------------
  const [committee, setCommittee] = useState([]);

  const addCommittee = () => setCommittee([...committee, { id: committee.length + 1, name: '' }]);

  const handleCommitteeChange = (e, index) => {
    committee[index].name = e.target.value;
    setCommittee(committee);
  };

  const handleCommitteeRemove = (ind) => {
    const a = committee.filter((i) => i.name !== ind);
    setCommittee(a);
  };
  //-------------------------------------------------------------------------------
  const [reviewer, setReviewer] = useState([]);

  const addReviewer = () => setReviewer([...reviewer, { id: reviewer.length + 1, name: '' }]);

  const handleReviewerChange = (e, index) => {
    reviewer[index].name = e.target.value;
    setReviewer(reviewer);
  };

  const handleReviewerRemove = (ind) => {
    const a = reviewer.filter((i) => i.name !== ind);
    setReviewer(a);
  };
  //-------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------
  //GET USERS----------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  return (
    <Container className="login">
      <Box>
        <Title>Add conference</Title>
        <FirstInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />

        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" required />

        <Input type="time" value={start} onChange={(e) => setStart(e.target.value)} placeholder="Conference start at" required />

        <Input type="time" value={end} onChange={(e) => setEnd(e.target.value)} placeholder="Conference end at" required />

        <Input type="number" value={maxCount} onChange={(e) => setMaxCount(e.target.value)} placeholder="max guests" required />

        <Input type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" required />

        <Wrapper>
          {!!committee.length && (
            <ButtonContainer>
              {committee.map((person, index) => {
                return (
                  <Buttons key={person.id}>
                    <TextInput onChange={(e) => handleCommitteeChange(e, index)} placeholder="Add committee" />
                    <RemoveButton onClick={() => handleCommitteeRemove(person.name)}>Remove</RemoveButton>
                  </Buttons>
                );
              })}
            </ButtonContainer>
          )}
          <Button onClick={() => addCommittee()}>Add Committee</Button>
          {!!reviewer.length && (
            <ButtonContainer>
              {reviewer.map((person, index) => {
                return (
                  <Buttons key={person.id}>
                    <TextInput onChange={(e) => handleReviewerChange(e, index)} placeholder="Add reviewer" />
                    <RemoveButton onClick={() => handleReviewerRemove(person.name)}>Remove</RemoveButton>
                  </Buttons>
                );
              })}
            </ButtonContainer>
          )}
          <Button onClick={() => addReviewer()}>Add Reviewer</Button>
          <Button className="login__btn" onClick={() => addConference(title, date, start, end, description, maxCount, committee, reviewer)}>
            Create conference
          </Button>
        </Wrapper>
      </Box>
    </Container>
  );
}

export default AddConference;

const Container = styled.div`
  display: flex;

  width: 100vw;
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 60px;
  gap: 15px;
  border: 1px lightgray solid;
  background-color: black;
  border-radius: 12px;
  flex-direction: column;
`;

const Title = styled.h1`
  color: white;
  padding-top: 25px;
  @media (min-width: 1000px) {
    padding-top: 40px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 20px;
  gap: 30px;
  margin-bottom: 30px;
  max-width: 100%;
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
  margin-top: 5px;
  &:hover {
    background: #fff;
    color: #1f57c1 !important;
  }
`;

const FirstInput = styled.input`
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
const Input = styled.input`
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

const RemoveButton = styled.a`
  color: white;
  cursor: pointer;
  font-size: 12px;
  padding-top: 5px;
`;

const TextInput = styled.input`
  -webkit-appearance: none;
  box-sizing: border-box;
  padding-left: 10px;
  font-size: 14px;
  border: 1px solid #1f57c1;
  color: white;
  background: none;
  height: 50px;
  width: 100%;
  margin: 0;
  transition: 0.3s;
  box-shadow: inset 0 0 0 none;
  padding-bottom: 10px;
  padding-top: 10px;
  ::placeholder {
    color: #bebebe;
  }
`;
