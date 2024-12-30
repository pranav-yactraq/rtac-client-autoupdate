import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme as theme } from './themes/theme';
import {
  Box,
  Container
} from '@mui/material';

import Header from './components/Header';
import LoginPage from './routes/LoginPage';
import { Routes, Route } from "react-router-dom";
import HomePage from './routes/HomePage';
import { useAuth } from './hooks/Auth';
import TestPage from './routes/TestPage';



function App() {
  const { isLoggedIn } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures global styles like background and text are applied */}
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.default, // Background for entire app
          color: theme.palette.text.primary,
        }}
      >
        {/* Transparent Header Section */}
        <Header />
        <Container
          maxWidth="lg"
          sx={!isLoggedIn? {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'stretch',
            padding: 2,
          } : {padding: 2}}
        >
          {/* Main content */}
          
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/home" element={<HomePage />} />
            </Routes>
          
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;

