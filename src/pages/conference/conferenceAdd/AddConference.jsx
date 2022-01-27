import React, { useEffect, useState } from 'react';
import { addConference } from '../../../api/firebase-conference';
import { auth } from '../../../api/firebase-user';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled, { keyframes } from 'styled-components';
import { usersList } from '../../../api/firebase-user';

function AddConference() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');
  const [maxCount, setMaxCount] = useState('');
  const [setUsers] = useState([]);

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

  const [user, loading] = useAuthState(auth);

  //-------------------------------------------------------------------------------
  //GET USERS----------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  useEffect(async () => {
    setUsers(await usersList());
  }, [user, loading]);
  return (
    <Container className="login">
      <Box>
        <h1>Add conference</h1>
        <PierwszePole type="text" className="login__textBox" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />

        <Input type="date" className="login__textBox" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" required />

        <Input
          type="time"
          className="login__textBox"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          placeholder="Conference start at"
          required
        />

        <Input type="time" className="login__textBox" value={end} onChange={(e) => setEnd(e.target.value)} placeholder="Conference end at" required />

        <Input
          type="number"
          className="login__textBox"
          value={maxCount}
          onChange={(e) => setMaxCount(e.target.value)}
          placeholder="max guests"
          required
        />

        <Input
          type="textarea"
          className="login__textBox"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
          required
        />

        {/* ------------------------------------------------------------------------------------------ */}
        <Wrapper>
          {/* ------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------ */}
          {!!committee.length && (
            <div>
              {committee.map((person, index) => {
                return (
                  <Buttons key={person.id}>
                    <Inpt onChange={(e) => handleCommitteeChange(e, index)} placeholder="Add committee" />
                    <Guzik onClick={() => handleCommitteeRemove(person.name)}>Remove</Guzik>
                  </Buttons>
                );
              })}
            </div>
          )}
          <Guzik onClick={() => addCommittee()}>Add Committee</Guzik>
          {/* ------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------ */}
          {!!reviewer.length && (
            <div>
              {reviewer.map((person, index) => {
                return (
                  <Buttons key={person.id}>
                    <Inpt onChange={(e) => handleReviewerChange(e, index)} placeholder="Add reviewer" />
                    <Guzik onClick={() => handleReviewerRemove(person.name)}>Remove</Guzik>
                  </Buttons>
                );
              })}
            </div>
          )}
          <Guzik onClick={() => addReviewer()}>Add Reviewer</Guzik>
          {/* ------------------------------------------------------------------------------------------ */}
          <Guzik className="login__btn" onClick={() => addConference(title, date, start, end, description, maxCount, committee, reviewer)}>
            Create conference
          </Guzik>
        </Wrapper>
      </Box>
    </Container>
  );
}

export default AddConference;

const Container = styled.div`
  min-height: 95vh;
  height: 100%;
  overflow: auto;
  width: 100vw;
  background: linear-gradient(135deg, LightSeaGreen, DarkOrchid, LightSeaGreen);
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 60px;
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
  padding-top: 20px;
  gap: 30px;
  margin-bottom: 30px;
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

const PierwszePole = styled.input`
  background: transparent;
  position: relative;
  border: none;
  border-bottom: solid 1px gray;
  height: 30px;
  width: 80%;
  z-index: 200;
  padding: 10px;
  font-size: 20px;
  font-weight: lighter;
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
  font-size: 20px;
  font-weight: lighter;
`;

const Inpt = styled.input`
  background: transparent;
  position: relative;
  border: none;
  border-bottom: solid 1px gray;
  height: 30px;
  width: 69%;
  z-index: 200;
  padding: 10px;
  font-size: 20px;
  font-weight: lighter;
`;
