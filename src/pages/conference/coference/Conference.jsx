import { getConferenceDetails, updateConference, deleteConference } from 'api/firebase-conference';
import React, { useEffect, useState } from 'react';
import { auth } from 'api/firebase-user';
import { storage, db } from 'api/firebase-config';
import { isAdmin, isAdminOrOwner } from 'api/permission';
import { getConferencesList, joinCoference, leaveCoference } from 'api/firebase-conference';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import AdminForm from 'components/conference/AdminForm';
import UserForm from 'components/conference/UserForm';
import {
  Container,
  TextContainer,
  Box,
  InputFile,
  TextWrapper,
  Wrapper,
  AddPerson,
  Buttons,
  Button,
  LastButton,
  InputText,
  Progress,
  Title,
  Label,
  SendContainer,
} from './ConferenceStyle';

function Conference(props) {
  const [conference, setConference] = useState({});
  const [admin, setAdmin] = useState(false);
  const [adminOrOwner, setAdminOrOwner] = useState(false);
  const [confList, setConfList] = useState([]);
  const [user] = useAuthState(auth);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(``);
  const [upload, setUpload] = useState('Upload');

  const formHandler = async (e, id) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    await uploadFile(file);
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

  const addCommittee = () => {
    const updated = conference.committee;
    updated.push({ id: conference.committee.length + 1, name: '' });
    setConference((s) => ({ ...s, committee: updated }));
  };

  const handleCommitteeChange = (e, index) => {
    const updateObject = conference;
    updateObject.committee[index].name = e.target.value;
    setConference(updateObject);
  };

  const handleCommitteeRemove = (ind) => {
    const updateObject = conference.committee.filter((i) => i.name !== ind);
    setConference((s) => ({ ...s, committee: updateObject }));
  };

  const addReviewer = () => {
    const updateObject = conference.reviewer;
    updateObject.push({ id: conference.reviewer.length + 1, name: '' });
    setConference((s) => ({ ...s, reviewer: updateObject }));
  };

  const handleReviewerChange = (e, index) => {
    const updateObject = conference;
    updateObject.reviewer[index].name = e.target.value;
    setConference(updateObject);
  };

  const handleReviewerRemove = (ind) => {
    const updateObject = conference.reviewer.filter((i) => i.name !== ind);
    setConference((s) => ({ ...s, reviewer: updateObject }));
  };

  const update = (e) => setConference((p) => ({ ...p, [e.target.name]: e.target.value }));

  const exitConference = async (id) => {
    await leaveCoference(id);
    const conferences = await getConferencesList();
    setConfList(conferences);
  };

  const enterConference = async (id) => {
    await joinCoference(id);
    const conferences = await getConferencesList();
    setConfList(conferences);
  };

  const uploadFile = (file) => {
    if (!file) return;
    const sotrageRef = ref(storage, `presentation/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    const getConference = async () => {
      const conferences = await getConferencesList();
      setConfList(conferences);
    };
    getConference();
  }, []);

  useEffect(() => {
    async function refresh() {
      if (progress === 100) {
        setUpload('Confirm');
      }
    }
    refresh();
  }, [progress]);

  useEffect(() => {
    const getConf = async () => {
      const ConfId = props.match.params.id;
      setConference(await getConferenceDetails(ConfId));
      setAdmin(await isAdmin(ConfId));
      setAdminOrOwner(await isAdminOrOwner(ConfId));
    };
    getConf();
  }, [props.match.params.id]);

  return (
    <Container className="login">
      {conference && (
        <Box>
          <Wrapper>
            {adminOrOwner ? (
              <AdminForm
                update={update}
                title={conference.title}
                date={conference.date}
                end={conference.end}
                start={conference.start}
                maxParticipants={conference.maxParticipants}
                description={conference.description}
              />
            ) : (
              <UserForm
                title={conference.title}
                date={conference.date}
                end={conference.end}
                start={conference.start}
                maxParticipants={conference.maxParticipants}
                description={conference.description}
              />
            )}
            {confList.map((details, key) => (
              <Wrapper key={key}>
                {details.id === props.match.params.id && (
                  <>
                    <Buttons key={key}>
                      {details.participants.filter((participant) => participant.name === user.email).length > 0 ? (
                        <Button onClick={() => exitConference(details.id)}>Leave</Button>
                      ) : (
                        <Button onClick={() => enterConference(details.id)}>Join</Button>
                      )}
                    </Buttons>
                    {adminOrOwner && (
                      <SendContainer onSubmit={(e) => formHandler(e, details.id)}>
                        <InputFile type="file" name="fileInput" id="fileInput" />
                        <Label htmlFor="fileInput">Choose a file</Label>
                        <LastButton type="submit">{upload}</LastButton>
                        <Progress>Uploading done {progress}%</Progress>
                      </SendContainer>
                    )}
                  </>
                )}
              </Wrapper>
            ))}
            {admin && (
              <TextContainer>
                <Title>Committee</Title>
                {conference.committee && !!conference.committee.length && (
                  <TextWrapper>
                    {conference.committee.map((person, index) => {
                      return (
                        <TextWrapper key={person.id}>
                          <InputText defaultValue={person.name} onChange={(e) => handleCommitteeChange(e, index)} />
                          <Button onClick={() => handleCommitteeRemove(person.name)}>Remove</Button>
                        </TextWrapper>
                      );
                    })}
                  </TextWrapper>
                )}
                <AddPerson onClick={addCommittee}>Add Committee</AddPerson>
              </TextContainer>
            )}
            {admin && (
              <TextContainer>
                <Title>Reviewer</Title>
                {conference.reviewer && !!conference.reviewer.length && (
                  <TextWrapper>
                    {conference.reviewer.map((person, index) => {
                      return (
                        <TextWrapper key={person.id}>
                          <InputText defaultValue={person.name} onChange={(e) => handleReviewerChange(e, index)} />
                          <Button onClick={() => handleReviewerRemove(person.name)}>Remove</Button>
                        </TextWrapper>
                      );
                    })}
                  </TextWrapper>
                )}
                <AddPerson onClick={() => addReviewer()}>Add Reviewer</AddPerson>
              </TextContainer>
            )}
            {adminOrOwner && (
              <TextWrapper>
                <Button
                  onClick={() =>
                    updateConference(
                      conference.title,
                      conference.date,
                      conference.start,
                      conference.end,
                      conference.maxParticipants,
                      conference.description,
                      conference.participants,
                      conference.committee,
                      conference.reviewer,
                      props.match.params.id
                    )
                  }
                >
                  Update
                </Button>
                <Button onClick={() => deleteConference(props.match.params.id)}>Delete</Button>
              </TextWrapper>
            )}
          </Wrapper>
        </Box>
      )}
    </Container>
  );
}
export default Conference;
