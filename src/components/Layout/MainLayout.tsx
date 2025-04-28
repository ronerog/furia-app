import { ReactNode } from 'react';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import ChatBox from './ChatBox';

interface MainLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
  withoutChat?: boolean;
  heroSection?: ReactNode;
}

const MainLayout = ({ children, fullWidth = false, withoutChat = false, heroSection }: MainLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const chatWidth = !withoutChat && !isMobile ? 320 : 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      {heroSection && (
        <Box sx={{ mt: 8 }}>
          {heroSection}
        </Box>
      )}
      
      <Box component="main" sx={{ flexGrow: 1, pt: heroSection ? 0 : 10, pb: 4 }}>
        {fullWidth ? (
          <Box sx={{ mr: chatWidth }}>
            {children}
          </Box>
        ) : (
          <Container maxWidth="lg" sx={{ mr: chatWidth > 0 ? `${chatWidth}px` : 0 }}>
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