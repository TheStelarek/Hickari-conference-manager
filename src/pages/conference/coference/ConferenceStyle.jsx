import styled from 'styled-components';

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

const SendContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 20px;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  background-color: #737373;
  color: white !important;
  transition: all 0.4s ease-in-out;
  justify-content: center;
  display: flex;
  cursor: pointer;
  width: 250px;
  align-items: center;
  padding-bottom: 10px;
  padding-top: 5px;
  &:hover {
    background: #fff;
    color: #1f57c1 !important;
  }
`;
const Button = styled.button`
  cursor: pointer;
  display: inline-block;
  color: #000;
  font-size: 16px;
  text-transform: uppercase;
  padding: 11px 20px;
  border: 1px black solid;
  background-color: white;
  animation: black 30s linear infinite;
  &:hover {
    animation: black 20s linear infinite;
    background-color: black;
    color: white;
  }
`;

const Title = styled.p`
  font-size: 30px;
  color: white;
  display: flex;
  justify-content: center;
`;

const LastButton = styled(Button)`
  margin-left: 0;
`;
const Progress = styled.p`
  color: white;
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
`;

const AddPerson = styled.button`
  cursor: pointer;
  display: inline-block;
  color: #000;
  font-size: 16px;
  text-transform: uppercase;
  padding: 11px 20px;
  border: 1px black solid;
  background-color: white;
  animation: black 30s linear infinite;
  &:hover {
    animation: black 20s linear infinite;
    background-color: black;
    color: white;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: solid 1px gray;
  margin-left: 10px;
  font-size: 14px;
  font-weight: lighter;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  margin-bottom: 5px;
  gap: 15px;
`;

const InputFile = styled(Input)`
  text-indent: -91px;
  border: none;
  color: white;
  margin-left: 150px;
`;

const Box = styled.div`
  display: flex;
  width: 300px;
  margin: auto;
  margin-top: 20px;
  gap: 15px;
  border: 1px lightgray solid;
  background-color: #1a1a1a;
  border-radius: 12px;
  flex-direction: column;
  margin-bottom: 20px;
  @media (min-width: 1000px) {
    width: 400px;
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

const Container = styled.div`
  height: 100%;
  overflow: auto;
  width: 100vw;
`;

export {
  Container,
  TextContainer,
  Box,
  InputFile,
  TextWrapper,
  Input,
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
};
