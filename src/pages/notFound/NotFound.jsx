import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: black;
`;

const Title = styled.h1`
  color: white;
  padding-top: 25px;
  @media (min-width: 1000px) {
    padding-top: 40px;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  gap: 15px;
  border: 1px #1f57c1 solid;
  background-color: black;
  border-radius: 12px;
  flex-direction: column;
  @media (min-width: 1000px) {
    width: 400px;
    height: 400px;
  }
`;

const Button = styled.a`
  position: relative;
  width: 200px;
  height: 50px;
  display: flex;
  border-radius: 100px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    border-radius: 0px;
  }
  &::before {
    content: '';
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    width: 200px;
    height: 50px;
    background-color: #1f57c1;
    transition: all 0.6s ease-in-out;
  }
  &:hover:before {
    background: white;
    border-radius: 0px;
    transition: all 0.6s ease-in-out;
  }
  &::after {
    content: 'Go Home';
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 50px;

    text-align: center;
    overflow: hidden;
    border-radius: 100px;
    border: 1px solid black;
    color: white;
    text-shadow: 1px 1px 0px black;
    font-weight: 400;
    font-size: 12pt;
    letter-spacing: 3px;
    text-transform: uppercase;

    background-size: 2px;
    background-position: top right;
    background-repeat: repeat;
    z-index: 10;
    transition: all 0.6s ease-in-out;
  }
  &:hover:after {
    background-size: 20%;
    text-shadow: 1px 1px 0px white;
    background-position: center;
    border-radius: 0px;
    color: black;
    border: 1px solid black;
    transform: rotateX(360deg);
    box-shadow: 1px 1px 0px #05299e, 2px 2px 0px #05299e, 3px 3px 0px #05299e, 4px 4px 0px #05299e, 5px 5px 0px #05299e, 6px 6px 0px #05299e;
    transition: all 0.6s ease-in-out;
  }
`;

const NotFound = () => (
  <Container>
    <Box>
      <Title>404 - Not Found!</Title>
      <Button href="/" />
    </Box>
  </Container>
);

export default NotFound;
