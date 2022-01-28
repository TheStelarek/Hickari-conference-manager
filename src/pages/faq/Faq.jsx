import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.main`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: black;
  margin-top: 100px;
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
`;

const AccordionContainer = styled.div`
  max-width: 500px;
`;

const AccordionItem = styled.div`
  border: 1px solid #1f57c1;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
`;

const AccordionTitle = styled.h4`
  margin: 0;
  padding: 1rem;
  cursor: pointer;
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
    title: 'Item 1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia volutpat congue. Nam ac sagittis diam, ac mattis justo. Integer enim est, sollicitudin quis egestas ut, pharetra id diam. Vestibulum quis nulla felis. Nullam rutrum laoreet semper. In hac habitasse platea dictumst.',
  },
  {
    title: 'Item 2',
    content:
      'Integer a odio eget enim imperdiet rutrum. Sed velit purus, vulputate et tempus sed, posuere a diam. Sed ac ligula consectetur augue euismod laoreet eu et mauris.',
  },
  {
    title: 'Item 3',
    content:
      'Proin sed nisi auctor, dictum tellus ut, rhoncus eros. Fusce venenatis, dolor eu viverra auctor, mi magna volutpat eros, pulvinar tincidunt arcu ante imperdiet urna. Proin ac nunc maximus, commodo ipsum sit amet, pellentesque lacus. Ut aliquet nunc at urna scelerisque aliquam. Mauris pellentesque orci vel faucibus lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Item 4',
    content:
      'Sed ultricies vel sapien nec efficitur. Donec vehicula purus ac orci elementum, eu eleifend quam porta. Maecenas at convallis lorem. Ut et ligula at massa porta euismod sit amet sit amet erat.',
  },
  {
    title: 'Item 5',
    content:
      'Vestibulum metus velit, dapibus posuere malesuada in, aliquet eu libero. Phasellus sed nisl volutpat diam eleifend luctus. Phasellus id lectus tempor metus facilisis bibendum ac fermentum felis. Sed quis sapien faucibus eros tempus porttitor. Proin tempus felis aliquam convallis ultricies. Aliquam id ipsum urna. Praesent vitae pulvinar dolor. Curabitur bibendum arcu enim, id lacinia augue viverra in. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus venenatis dolor nec nisl facilisis, a porta metus interdum.',
  },
  {
    title: 'Item 6',
    content:
      'Maecenas gravida ante at venenatis varius. Pellentesque elementum enim sit amet sapien facilisis rutrum. Donec dictum, purus quis pulvinar interdum, nulla dolor lobortis velit, eget laoreet mauris quam non libero. Curabitur vulputate est purus, volutpat aliquam massa suscipit ac. Nulla auctor mauris malesuada posuere sagittis. Nulla in augue turpis. Phasellus aliquet vitae mauris sit amet consequat. Fusce eu consequat nisl, vel tincidunt magna. Curabitur eu porta ante. Pellentesque non libero libero. Nulla facilisi. Nullam eu ipsum maximus, luctus dui at, vehicula velit.',
  },
];

const AccordionItems = ({ accordionContent, refs, currentAccordion, setCurrentAccordion, setBodyHeight, bodyHeight }) =>
  accordionContent.map(({ title, content }, i) => (
    <AccordionItem key={`accordion-item-${i}`}>
      <AccordionTitle
        onClick={() => {
          setCurrentAccordion(i);
          setBodyHeight(refs[i].current.clientHeight);
          console.log(refs[i].current.clientHeight);
        }}
      >
        {title}
      </AccordionTitle>
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
        <AccordionContainer>
          <AccordionItems
            accordionContent={sampleAccordionData}
            refs={refs}
            currentAccordion={currentAccordion}
            setCurrentAccordion={setCurrentAccordion}
            setBodyHeight={setBodyHeight}
            bodyHeight={bodyHeight}
          />
        </AccordionContainer>
      </Section>
    </Container>
  );
}

export default Faq;
