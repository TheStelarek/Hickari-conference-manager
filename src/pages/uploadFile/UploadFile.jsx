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

  useEffect(() => {
    async function refresh() {
      if (progress === 100) {
        window.location.reload();
      }
    }
    refresh();
  }, [progress]);

  const getLink = async (link) => {
    setUrl(await getDownloadURL(ref(storage, `files/${link}`)));
  };

  const usun = async (link) => {
    setDelete(await deleteObject(ref(storage, `files/${link}`)));
  };
  return (
    <Container>
      <Box>
        <UploadContainer>
          <Form onSubmit={formHandler}>
            <Input type="file" />
            <Guzik type="submit">Upload</Guzik>
          </Form>
        </UploadContainer>
        <h2>Uploading done {progress}%</h2>
        {obj && obj.items && obj.items.length > 0 && (
          <ul>
            {obj.items.map((d) => {
              return (
                <MapContainer>
                  <p>{d.name}</p>
                  <div>
                    <Guzik onClick={() => getLink(d.name)}>Pokaż link</Guzik>
                    <Guzik onClick={() => usun(d.name) && window.location.reload()}>Usuń plik</Guzik>
                  </div>
                </MapContainer>
              );
            })}
          </ul>
        )}
        <p>LINK</p>
        {url && <a href={url}>Click me</a>}
      </Box>
    </Container>
  );
};

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

const Input = styled.input`
  background-color: lightgray;
`;

const Form = styled.form`
  margin-top: 20px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  margin: auto;
  margin-bottom: 30px;
  margin-top: 30px;
  gap: 15px;
  border: 1px lightgray solid;
  background-color: lightgray;
  border-radius: 12px;
  flex-direction: column;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const MapContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const UploadContainer = styled.div`
  position: static;
`;

const Container = styled.div`
  min-height: 95vh;
  height: 100%;
  overflow: auto;
  width: 100vw;
  background: linear-gradient(135deg, LightSeaGreen, DarkOrchid, LightSeaGreen);
`;

export default UploadFile;
