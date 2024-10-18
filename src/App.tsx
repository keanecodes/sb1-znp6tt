import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Assignments from './pages/Assignments';
import Forums from './pages/Forums';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { useAuthStore } from './stores/authStore';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
`;

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppWrapper>
          <Header />
          <MainContent>
            <Routes>
              {isAuthenticated ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/assignments" element={<Assignments />} />
                  <Route path="/forums" element={<Forums />} />
                  <Route path="/profile" element={<Profile />} />
                </>
              ) : (
                <Route path="*" element={<Login />} />
              )}
            </Routes>
          </MainContent>
          <Footer />
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;