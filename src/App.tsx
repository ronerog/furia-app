
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme/theme';

import { AuthProvider } from './contexts/AuthContext';
import { PointsProvider } from './contexts/PointsContext';
import { ChatProvider } from './contexts/ChatContext';

// Importação das páginas
import Home from './pages/Home';
// import GamePage from './pages/GamePage';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Rewards from './pages/Rewards';
// import Shop from './pages/Shop';
// import News from './pages/News';
// import NewsItem from './pages/NewsItem';
// import Streams from './pages/Streams';
// import Matches from './pages/Matches';
// import PlayerProfile from './pages/PlayerProfile';
// import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <PointsProvider>
            <ChatProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/games/:game" element={<GamePage />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/rewards" element={<Rewards />} />
                {/* <Route path="/shop" element={<Shop />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsItem />} />
                <Route path="/streams" element={<Streams />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/player/:id" element={<PlayerProfile />} />
                <Route path="*" element={<NotFound />} /> */}
              </Routes>
            </ChatProvider>
          </PointsProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;