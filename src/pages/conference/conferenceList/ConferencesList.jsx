import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getConferencesList, joinCoference, leaveCoference } from '../../../api/firebase-conference';
import { auth } from '../../../api/firebase-user';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { storage, db } from 'api/firebase-config';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

function ConverenceList() {
  const [progress, setProgress] = useState(0);
  const [user] = useAuthState(auth);
  const [confList, setConfList] = useState([]);
  const history = useHistory();

  const [url, setUrl] = useState(``);

  const [upload, setUpload] = useState('Upload');

  const formHandler = async (e, id) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    await uploadFiles(file);

    const konferencja = await db
      .collection('conferences')
      .doc(id)
      .get()
      .then((d) => d.data());

    const uczestnikIndex = konferencja.participants.findIndex((p) => p.name === auth.currentUser.email);
    konferencja.participants[uczestnikIndex].link = url;

    await db.collection('conferences').doc(id).update({
      participants: konferencja.participants,
    });
  };

  const getConference = async (conf) => {
    history.replace(`/conference/${conf}`);
  };

  useEffect(() => {
    async function refresh() {
      if (progress === 100) {
        setUpload('Confirm');
      }
    }
    refresh();
  }, [progress]);

  useEffect(async () => {
    setConfList(await getConferencesList());
  }, []);

  const uploadFiles = (file) => {
    if (!file) return;
    const sotrageRef = ref(storage, `presentation/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  };

  return (
    <Container>
      <Box>
        {!!confList.length && (
          <MapContainer>
            {confList.map((d) => (
              <Form key={d.id}>
                <p>Title: {d.title}</p>
                <p>{d.id}</p>
                <p>Author: {d.author}</p>
                <p>Date: {d.date}</p>
                <p>Starts at: {d.start}</p>
                <p>Ends at: {d.end}</p>
                <Buttons>
                  <Guzik onClick={() => getConference(d.id)}>Details</Guzik>
                  <Guzik onClick={() => joinCoference(d.id)}>Join</Guzik>
                  <Guzik onClick={() => leaveCoference(d.id)}>Leave</Guzik>
                </Buttons>
                {d.participants &&
                  !!d.participants.length &&
                  d.participants.map((e, id) => {
                    return (
                      <div>
                        {user.email === e.name && (
                          <div>
                            <SendContainer onSubmit={(e) => formHandler(e, d.id)} key={id}>
                              <Input type="file" />
                              <Guzik type="submit">{upload}</Guzik>
                            </SendContainer>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </Form>
            ))}
          </MapContainer>
        )}
        <h2>Uploading done {progress}%</h2>
      </Box>
    </Container>
  );
}

export default ConverenceList;

const Guzik = styled.button`
  cursor: pointer;
  display: inline-block;
  color: #000;
  font-size: 16px;
  text-transform: uppercase;
  padding: 11px 20px;
  border: 1px black solid;
  background-color: white;
  margin-left: 31px;

  animation: black 30s linear infinite;
  &:hover {
    animation: black 20s linear infinite;
    background-color: black;
    color: white;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  margin-left: -30px;
  justify-content: center;
`;

const Input = styled.input`
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

const Form = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px gray solid;
  border-radius: 12px;
  padding: 10px;
`;

const SendContainer = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  padding: 10px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1000px;
  margin: auto;
  margin-top: 100px;
  gap: 15px;
  border: 1px lightgray solid;
  background-color: lightgray;
  border-radius: 12px;
  flex-direction: column;
  margin-bottom: 60px;

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
  gap: 10px;
`;

const Container = styled.div`
  min-height: 95vh;
  height: 100%;
  overflow: auto;
  width: 99vw;
  background: linear-gradient(135deg, LightSeaGreen, DarkOrchid, LightSeaGreen);
`;
