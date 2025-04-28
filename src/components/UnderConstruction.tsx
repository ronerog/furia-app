import { Typography, Button, Paper, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import ConstructionIcon from '@mui/icons-material/Construction';
import MainLayout from './Layout/MainLayout';

interface UnderConstructionProps {
  pageName: string;
}

const UnderConstruction = ({ pageName }: UnderConstructionProps) => {
  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ my: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 6,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <ConstructionIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
          
          <Typography variant="h3" component="h1" gutterBottom>
            Página em Construção
          </Typography>
          
          <Typography variant="h5" color="text.secondary" gutterBottom>
            A página {pageName} está sendo desenvolvida
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            Nossa equipe está trabalhando para entregar essa funcionalidade em breve. 
            Agradecemos a sua paciência e compreensão.
          </Typography>
          
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Voltar para Home
          </Button>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default UnderConstruction;