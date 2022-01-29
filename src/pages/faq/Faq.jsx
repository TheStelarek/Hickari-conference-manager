import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.main`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: black;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  background-color: black;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 12px;
  width: 300px;
  margin-bottom: 20px;
  @media (min-width: 1000px) {
    width: 800px;
  }
`;

const InnerSection = styled.div``;

const AccordionContainer = styled.div`
  max-width: 500px;
`;

const AccordionInner = styled.div``;

const AccordionItem = styled.div`
  border: 1px solid #1f57c1;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
`;

const AccordionTitle = styled.h4`
  margin: 0;
  padding: 1rem;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AccordionBody = styled.div`
  padding: 0;
  margin: 0;
  height: 0;
  overflow: hidden;
  transition: height 0.3s;

  ${({ active, bodyHeight }) =>
    active &&
    css`
      height: ${bodyHeight}px;
    `}
`;

const AccordionContent = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  padding-bottom: 25px;
`;

const Title = styled.h1`
  color: white;
  padding-top: 25px;
  @media (min-width: 1000px) {
    padding-top: 40px;
  }
`;

const sampleAccordionData = [
  {
    title: 'Can I register online?',
    content:
      'There is a possibility to register online. In this case please provide the full details on the online registration and your contact number in international format. The registration department will contact you immediately to assist you on how to proceed with the registration fees payment.',
  },
  {
    title: 'Do you offer a Center Stage only ticket?',
    content:
      'We do not offer a Center Stage only ticket. We have found that attending all days of the event offers the best conference experience and provides the best value for our attendees.',
  },
  {
    title: 'Do you offer any Discounts?',
    content: 'No discounts apply to early-bird registration pricing.',
  },
  {
    title: 'What is the registration cost?',
    content: 'All conference registration costs will be listed on the registration page of the Conference website.',
  },
  {
    title: 'My credit card won’t process.',
    content:
      'Credit card processing problems are generally caused by a mismatch in the billing address of the credit card holder. Check that the address entered matches the billing address listed with your credit card provider or contact your credit card provider to authorize the charge.',
  },
  {
    title: 'Can i download presentation after event?',
    content: 'Yes, you can.',
  },
];

const AccordionItems = ({ accordionContent, refs, currentAccordion, setCurrentAccordion, setBodyHeight, bodyHeight }) =>
  accordionContent.map(({ title, content }, i) => (
    <AccordionItem
      onClick={() => {
        setCurrentAccordion(i);
        setBodyHeight(refs[i].current.clientHeight);
        console.log(refs[i].current.clientHeight);
      }}
      key={`accordion-item-${i}`}
    >
      <AccordionTitle>{title}</AccordionTitle>
      <AccordionBody active={currentAccordion === i} bodyHeight={bodyHeight}>
        <AccordionContent ref={refs[i]}>{content}</AccordionContent>
      </AccordionBody>
    </AccordionItem>
  ));

function Faq() {
  const [currentAccordion, setCurrentAccordion] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);

  const item0 = useRef(null);
  const item1 = useRef(null);
  const item2 = useRef(null);
  const item3 = useRef(null);
  const item4 = useRef(null);
  const item5 = useRef(null);

  const refs = [item0, item1, item2, item3, item4, item5];

  return (
    <Container>
      <Section>
        <Title>FAQ</Title>
        <InnerSection>
          <AccordionContainer>
            <AccordionInner>
              <AccordionItems
                accordionContent={sampleAccordionData}
                refs={refs}
                currentAccordion={currentAccordion}
                setCurrentAccordion={setCurrentAccordion}
                setBodyHeight={setBodyHeight}
                bodyHeight={bodyHeight}
              />
            </AccordionInner>
          </AccordionContainer>
        </InnerSection>
      </Section>
    </Container>
  );
}

export default Faq;
