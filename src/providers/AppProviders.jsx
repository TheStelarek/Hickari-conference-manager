import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import { Navbar } from '../components/Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'api/firebase-config';
import { useEffect } from 'react';
import styled from 'styled-components';

const AppProviders = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [waiting] = useAuthState(auth);

  useEffect(() => {
    setTimeout(() => {
      setLoading(waiting);
    }, 500);
  }, []);

  return (
    <div>
      {loading ? (
        <Container></Container>
      ) : (
        <Router>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Navbar />
            {children}
          </ThemeProvider>
        </Router>
      )}
    </div>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 96vh;
  width: 96vw;
  animation: 3s ease-in 1s infinite reverse both running slidein;
`;

export default AppProviders;
