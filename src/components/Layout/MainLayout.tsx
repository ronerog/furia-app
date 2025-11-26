import { ReactNode } from 'react';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import ChatBox from './ChatBox';
import { useChatOpen } from '../../hooks/chatOpen';

interface MainLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
  withoutChat?: boolean;
  heroSection?: ReactNode;
}

const CHAT_WIDTH = 320;

const MainLayout = ({ children, fullWidth = false, withoutChat = false, heroSection }: MainLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const isChatOpen = useChatOpen();

  const reserveChatSpace = !withoutChat && !isMobile && isChatOpen;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      {heroSection && (
        <Box sx={{ mt: 8 }}>
          {heroSection}
        </Box>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: heroSection ? 0 : 10,
          pb: 4,
          pr: reserveChatSpace ? `${CHAT_WIDTH}px` : 0,
          transition: 'padding-right 0.3s ease',
        }}
      >
        {fullWidth ? (
          <Box>
            {children}
          </Box>
        ) : (
          <Container maxWidth="lg">
            {children}
          </Container>
        )}
      </Box>

      {!withoutChat && <ChatBox />}

      <Footer />
    </Box>
  );
};

export default MainLayout;
