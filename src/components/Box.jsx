import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  gap: 15px;
  border: 1px #1f57c1 solid;
  background-color: black;
  border-radius: 12px;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  @media (min-width: 1000px) {
    width: 400px;
  }
`;

export { Box };
