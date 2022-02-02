import { getConferenceDetails, updateConference, deleteConference } from 'api/firebase-conference';
import React, { useEffect, useState } from 'react';
import { auth } from 'api/firebase-user';
import { storage, db } from 'api/firebase-config';
import { isAdmin, isAdminOrOwner } from 'api/permission';
import { getConferencesList, joinCoference, leaveCoference } from 'api/firebase-conference';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import AdminForm from 'components/Conference/AdminForm';
import UserForm from 'components/Conference/UserForm';
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
  const [obj, setObj] = useState({});
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
    const updated = obj.committee;
    updated.push({ id: obj.committee.length + 1, name: '' });
    setObj((s) => ({ ...s, committee: updated }));
  };

  const handleCommitteeChange = (e, index) => {
    const updateObject = obj;
    updateObject.committee[index].name = e.target.value;
    setObj(updateObject);
  };

  const handleCommitteeRemove = (ind) => {
    const updateObject = obj.committee.filter((i) => i.name !== ind);
    setObj((s) => ({ ...s, committee: updateObject }));
  };

  const addReviewer = () => {
    const updateObject = obj.reviewer;
    updateObject.push({ id: obj.reviewer.length + 1, name: '' });
    setObj((s) => ({ ...s, reviewer: updateObject }));
  };

  const handleReviewerChange = (e, index) => {
    const updateObject = obj;
    updateObject.reviewer[index].name = e.target.value;
    setObj(updateObject);
  };

  const handleReviewerRemove = (ind) => {
    const updateObject = obj.reviewer.filter((i) => i.name !== ind);
    setObj((s) => ({ ...s, reviewer: updateObject }));
  };

  useEffect(() => {
    const getConf = async () => {
      const ConfId = props.match.params.id;

      setObj(await getConferenceDetails(ConfId));
      setAdmin(await isAdmin());
      setAdminOrOwner(await isAdminOrOwner(ConfId));
    };
    getConf();
  }, [props.match.params.id]);
  const update = (e) => setObj((p) => ({ ...p, [e.target.name]: e.target.value }));

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

  useEffect(() => {
    const getConference = async () => {
      const conferences = await getConferencesList();
      setConfList(conferences);
    };
    getConference();
  }, []);

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
    async function refresh() {
      if (progress === 100) {
        setUpload('Confirm');
      }
    }
    refresh();
  }, [progress]);

  return (
    <Container className="login">
      {obj && (
        <Box>
          <Wrapper>
            {adminOrOwner && (
              <AdminForm
                update={update}
                title={obj.title}
                date={obj.date}
                end={obj.end}
                start={obj.start}
                maxParticipants={obj.maxParticipants}
                description={obj.description}
              />
            )}
            {!adminOrOwner && (
              <UserForm
                title={obj.title}
                date={obj.date}
                end={obj.end}
                start={obj.start}
                maxParticipants={obj.maxParticipants}
                description={obj.description}
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
                {obj.committee && !!obj.committee.length && (
                  <TextWrapper>
                    {obj.committee.map((person, index) => {
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
                {obj.reviewer && !!obj.reviewer.length && (
                  <TextWrapper>
                    {obj.reviewer.map((person, index) => {
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
                  className="login__btn"
                  onClick={() =>
                    updateConference(
                      obj.title,
                      obj.date,
                      obj.start,
                      obj.end,
                      obj.maxParticipants,
                      obj.description,
                      obj.participants,
                      obj.committee,
                      obj.reviewer,
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
