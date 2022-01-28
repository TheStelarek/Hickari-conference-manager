import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100vw;
  overflow: hidden;
  flex-direction: column;
  background-color: black;
`;

const Title = styled.h1`
  color: white;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 1000px) {
    flex-direction: row;
    font-size: 50px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Color = styled.span`
  color: gray;
`;

const Text = styled.div`
  color: white;
  font-size: 20px;
  word-break: break-word;
  @media (min-width: 1000px) {
    font-size: 30px;
  }
`;

const SubTitle = styled.div`
  color: white;
  font-size: 20px;
  word-break: break-word;
  width: 90%;
  @media (min-width: 1000px) {
    font-size: 30px;
    max-width: 800px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 100px;
`;

const Button = styled.button`
  margin-top: 30px;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease-in;
  background-color: #1f57c1;
  border: none;
  border-radius: 40px;
  width: 150px;
  height: 40px;
  font-size: 20px;
  margin-bottom: 40px;

  &:hover {
    color: #1f57c1;
    background-color: white;
  }
`;

const UpContainer = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60%;
  margin-top: 50px;
`;

const FeaturesContainer = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 40px;
  @media (min-width: 1000px) {
    margin-top: 20px;
  }
`;

const Features = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 1000px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 50px;
    margin-top: 30px;
    padding-left: 40px;
    padding-right: 40px;
  }
`;

const BoxContainer = styled.div`
  margin-top: 30px;
  border: 1px #4c79cd solid;
  border-radius: 12px;
  height: 275px;
  background-color: black;
  max-width: 700px;

  @media (min-width: 1000px) {
    height: 300px;
    width: 400px;
  }
`;

const BoxCategory = styled.div`
  color: lightgray;
  padding: 15px;
  @media (min-width: 1258px) {
    padding: 30px;
  }
`;

const BoxTopic = styled.div`
  color: lightgray;
  padding: 15px;
  margin-left: auto;
  @media (min-width: 1258px) {
    padding: 30px;
  }
`;

const BoxInformaitons = styled.div`
  display: flex;
  flex-direction: row;
`;

const MiddleBoxContainer = styled(BoxContainer)`
  background-color: #1f57c1;
  border: #1f57c1 solid 1px;
`;

const BoxTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BoxTitle = styled.div`
  font-size: 30px;
  color: white;
`;

const BoxText = styled.div`
  color: lightgray;
  font-size: 14px;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const FaqText = styled.div`
  color: lightgray;
  font-size: 12px;
  margin-top: 40px;
  font-weight: 800;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
  @media (min-width: 1000px) {
    font-size: 14px;
  }
`;

const Home = () => {
  return (
    <Container>
      <UpContainer>
        <TextContainer>
          <Title>
            Hickari <Color>Conference</Color> Manager
          </Title>
        </TextContainer>
        <TextWrapper>
          <SubTitle>A system that offers you to set up your own conference, fast technical support and low prices!</SubTitle>
        </TextWrapper>
        <Button>Get Started</Button>
      </UpContainer>
      <FeaturesContainer>
        <Text>Features</Text>
        <Features>
          <BoxContainer>
            <BoxInformaitons>
              <BoxCategory>Design</BoxCategory>
              <BoxTopic>Web App</BoxTopic>
            </BoxInformaitons>
            <BoxTitleContainer>
              <BoxTitle>Simple Design</BoxTitle>
              <BoxText>Our website has a very simple design, so every person will not have any problems how to navigate the site.</BoxText>
              <FaqText>Want more information? Check out our FAQ.</FaqText>
            </BoxTitleContainer>
          </BoxContainer>
          <MiddleBoxContainer>
            <BoxInformaitons>
              <BoxCategory>Experts</BoxCategory>
              <BoxTopic>Web App</BoxTopic>
            </BoxInformaitons>
            <BoxTitleContainer>
              <BoxTitle>Top Experts</BoxTitle>
              <BoxText>
                Our site has to offer the best experts in conducting conferences, from all over the world. They will be more than happy to help you!
              </BoxText>
              <FaqText>Want more information? Check out our FAQ.</FaqText>
            </BoxTitleContainer>
          </MiddleBoxContainer>
          <BoxContainer>
            <BoxInformaitons>
              <BoxCategory>Conferences</BoxCategory>
              <BoxTopic>Web App</BoxTopic>
            </BoxInformaitons>
            <BoxTitleContainer>
              <BoxTitle>Conferences</BoxTitle>
              <BoxText>Our site has conducted scientific conferences for major brands! Recommendations from the biggest companies!</BoxText>
              <FaqText>Want more information? Check out our FAQ.</FaqText>
            </BoxTitleContainer>
          </BoxContainer>
        </Features>
      </FeaturesContainer>
    </Container>
  );
};

export default Home;
