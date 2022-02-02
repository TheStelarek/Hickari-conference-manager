import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { storage } from 'api/firebase-config';
import { listItem } from 'api/firebase-file';

const UploadFile = () => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState();
  const [setDelete] = useState();
  const [obj, setObj] = useState({});

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    async function getItem() {
      setObj(await listItem());
    }
    getItem();
  }, []);

  const getLink = async (link) => {
    setUrl(await getDownloadURL(ref(storage, `files/${link}`)));
  };

  const usun = async (link) => {
    setDelete(await deleteObject(ref(storage, `files/${link}`)));
  };

  return (
    <Container>
      <Title>Upload your documents</Title>
      <UploadContainer>
        <Form onSubmit={formHandler}>
          <Input type="file" name="file" id="file" />
          <Label for="file">Choose a file (Click me)</Label>
          <Button type="submit">Upload</Button>
        </Form>
      </UploadContainer>
      <Progress>Uploading done {progress}%</Progress>
      {obj && obj.items && obj.items.length > 0 && (
        <Ul>
          {obj.items.map((d) => {
            return (
              <MapContainer>
                <Text>{d.name}</Text>
                <Buttons>
                  <Button onClick={() => getLink(d.name)}>Show Link</Button>
                  <Button onClick={() => usun(d.name) && window.location.reload()}>Delete</Button>
                </Buttons>
              </MapContainer>
            );
          })}
        </Ul>
      )}
      <Text>LINK</Text>
      {url && <Click href={url}>Click me</Click>}
    </Container>
  );
};

const Button = styled.button`
  background-color: #737373;
  border: none;
  color: white !important;
  transition: 400ms ease all;
  justify-content: center;
  display: flex;
  cursor: pointer;
  width: 100%;
  align-items: center;
  height: 30px;

  &:hover {
    background: #fff;
    color: #1f57c1 !important;
  }
`;

const Title = styled.a`
  color: white;
  padding-top: 25px;
  font-size: 20px;
  @media (min-width: 1000px) {
    padding-top: 30px;
    font-size: 40px;
    font-weight: 600;
  }
`;

const Progress = styled.a`
  color: white;
  padding-top: 25px;
  font-size: 20px;
  @media (min-width: 1000px) {
    padding-top: 30px;
    font-size: 40px;
    padding-bottom: 20px;
  }
`;

const Text = styled.p`
  color: white;
`;

const Ul = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 22px;
`;

const Click = styled.a`
  color: white;
  text-decoration: none;
  font-size: 20px;
`;

const Label = styled.label`
  background-color: #737373;
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
  &:hover {
    background: #fff;
    color: #1f57c1 !important;
  }
`;

const Input = styled.input.attrs({ type: 'file' })`
  text-indent: -90px;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 20px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  justify-content: center;
`;

const MapContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  border: 1px white solid;
  padding: 10px;
  border-radius: 12px;
`;

const UploadContainer = styled.div``;

export default UploadFile;
