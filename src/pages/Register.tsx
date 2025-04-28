import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller, FormProvider, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext } from '../contexts/AuthContext';
import MainLayout from '../components/Layout/MainLayout';
import logo from '../assets/furia-logo.png';

const accountSchema = yup.object({
  username: yup.string()
    .required('Nome de usuário é obrigatório')
    .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres')
    .max(20, 'Nome de usuário deve ter no máximo 20 caracteres'),
  email: yup.string()
    .email('Digite um e-mail válido')
    .required('E-mail é obrigatório'),
  password: yup.string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .required('Confirmação de senha é obrigatória')
});

const personalInfoSchema = yup.object({
  fullName: yup.string()
    .required('Nome completo é obrigatório'),
  birthDate: yup.string()
    .required('Data de nascimento é obrigatória'),
  city: yup.string(),
  state: yup.string(),
  country: yup.string()
});

const fanInfoSchema = yup.object({
  favoriteGame: yup.string(),
  howDidYouFind: yup.string(),
  instagramHandle: yup.string(),
  twitterHandle: yup.string(),
  twitchHandle: yup.string(),
  favoritePlayer: yup.string(),
  termsAccepted: yup.boolean()
    .oneOf([true], 'Você deve aceitar os termos de uso')
});

const schemas = [accountSchema, personalInfoSchema, fanInfoSchema];

const registerSchema = yup.object().shape({
    username: yup.string().required('O nome de usuário é obrigatório'),
    email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas devem coincidir')
      .required('A confirmação de senha é obrigatória'),
    fullName: yup.string().required('O nome completo é obrigatório'),
    birthDate: yup.string().required('A data de nascimento é obrigatória'),
    city: yup.string(),
    state: yup.string(),
    country: yup.string(),
    favoriteGame: yup.string(),
    howDidYouFind: yup.string(),
    instagramHandle: yup.string(),
    twitterHandle: yup.string(),
    twitchHandle: yup.string(),
    favoritePlayer: yup.string(),
    termsAccepted: yup
      .boolean()
      .oneOf([true], 'Você deve aceitar os termos e condições')
      .required('Você deve aceitar os termos e condições'),
  });

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  birthDate: string;
  city?: string;
  state?: string;
  country?: string;
  favoriteGame?: string;
  howDidYouFind?: string;
  instagramHandle?: string;
  twitterHandle?: string;
  twitchHandle?: string;
  favoritePlayer?: string;
  termsAccepted: boolean;
}

const AccountInfoStep = () => {
  const { control, formState: { errors } } = useFormContext<RegisterFormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Informações da conta
      </Typography>
      
      <Grid container spacing={2}>
        <Grid size={{xs: 12}}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Nome de usuário"
                variant="outlined"
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />
        </Grid>
        
        <Grid size={{xs: 12}}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
        
        <Grid size={{xs: 12, md: 6}}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        
        <Grid size={{xs: 12, md: 6}}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Confirmar senha"
                type={showConfirmPassword ? 'text' : 'password'}
                variant="outlined"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const PersonalInfoStep = () => {
  const { control, formState: { errors } } = useFormContext<RegisterFormData>();
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Dados pessoais
      </Typography>
      
      <Grid container spacing={2}>
        <Grid size={{md: 12}}>ss
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Nome completo"
                variant="outlined"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            )}
          />
        </Grid>
        
        <Grid size={{xs: 12, md: 6}}>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Data de nascimento"
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={!!errors.birthDate}
                helperText={errors.birthDate?.message}
              />
            )}
          />
        </Grid>
        
        <Grid size={{xs: 12, md: 6}}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="País"
                variant="outlined"
                error={!!errors.country}
                helperText={errors.country?.message}
              />
            )}
          />
        </Grid>
        
        <Grid size={{xs: 12, md: 6}}>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Estado"
                variant="outlined"
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            )}
          />
        </Grid>
        
        <Grid size={{xs: 12, md: 6}}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Cidade"
                variant="outlined"
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const FanInfoStep = () => {
  const { control, formState: { errors } } = useFormContext<RegisterFormData>();
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Informações do fã
      </Typography>
      
      <Grid container spacing={2}>
        <Grid size={{xs: 12, md: 6}}>
          <Controller
            name="favoriteGame"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label="Jogo favorito da FURIA"
                variant="outlined"
                error={!!errors.favoriteGame}
                helperText={errors.favoriteGame?.message}
              >
                <MenuItem value="">Selecione...</MenuItem>
                <MenuItem value="valorant">Valorant</MenuItem>
                <MenuItem value="csgo">CS:GO</MenuItem>
                <MenuItem value="lol">League of Legends</MenuItem>
                <MenuItem value="apex">Apex Legends</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        
        <Grid size={{xs: 12, md: 6}}>
          <Controller
            name="favoritePlayer"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Jogador favorito da FURIA"
                variant="outlined"
                error={!!errors.favoritePlayer}
                helperText={errors.favoritePlayer?.message}
              />
            )}
          />
        </Grid>
        
        <Grid size={{xs: 12}}>
          <Controller
            name="howDidYouFind"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label="Como conheceu a FURIA?"
                variant="outlined"
                error={!!errors.howDidYouFind}
                helperText={errors.howDidYouFind?.message}
              >
                <MenuItem value="">Selecione...</MenuItem>
                <MenuItem value="youtube">YouTube</MenuItem>
                <MenuItem value="twitch">Twitch</MenuItem>
                <MenuItem value="instagram">Instagram</MenuItem>
                <MenuItem value="twitter">Twitter</MenuItem>
                <MenuItem value="friend">Amigo</MenuItem>
                <MenuItem value="tournament">Torneio</MenuItem>
                <MenuItem value="other">Outro</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        
        <Grid size={{xs: 12}}>
          <Typography variant="subtitle1" gutterBottom>
            Redes sociais (opcionais)
          </Typography>
        </Grid>
        
        <Grid size={{xs: 12, sm: 4}}>
          <Controller
            name="instagramHandle"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Instagram"
                placeholder="@seu_instagram"
                variant="outlined"
                error={!!errors.instagramHandle}
                helperText={errors.instagramHandle?.message}
              />
            )}
            />
          </Grid>
          
          <Grid size={{xs: 12, sm: 4}}>
            <Controller
              name="twitterHandle"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Twitter"
                  placeholder="@seu_twitter"
                  variant="outlined"
                  error={!!errors.twitterHandle}
                  helperText={errors.twitterHandle?.message}
                />
              )}
            />
          </Grid>
          
          <Grid size={{xs: 12, sm: 4}}>
            <Controller
              name="twitchHandle"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Twitch"
                  placeholder="seu_canal_twitch"
                  variant="outlined"
                  error={!!errors.twitchHandle}
                  helperText={errors.twitchHandle?.message}
                />
              )}
            />
          </Grid>
          
          <Grid size={{xs: 12}}>
            <Controller
              name="termsAccepted"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      color="primary"
                      checked={field.value}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Concordo com os{' '}
                      <Link to="/terms" style={{ color: '#00c2ff' }}>
                        termos de uso
                      </Link>{' '}
                      e{' '}
                      <Link to="/privacy" style={{ color: '#00c2ff' }}>
                        política de privacidade
                      </Link>
                    </Typography>
                  }
                />
              )}
            />
            {errors.termsAccepted && (
              <Typography variant="caption" color="error">
                {errors.termsAccepted.message}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  const Register = () => {
    const navigate = useNavigate();
    const { register: registerUser } = useContext(AuthContext);
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const steps = ['Conta', 'Dados Pessoais', 'Informações do Fã'];
    const StepContent = [AccountInfoStep, PersonalInfoStep, FanInfoStep];
    const CurrentStep = StepContent[activeStep];
    
    const methods = useForm({
      resolver: yupResolver(registerSchema),
      defaultValues: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        birthDate: '',
        city: '',
        state: '',
        country: '',
        favoriteGame: '',
        howDidYouFind: '',
        instagramHandle: '',
        twitterHandle: '',
        twitchHandle: '',
        favoritePlayer: '',
        termsAccepted: false
      },
      mode: 'onChange'
    });
    
    const { trigger, handleSubmit, formState: { isValid } } = methods;
  
    const handleNext = async () => {
      const currentSchema = schemas[activeStep];
      const fields = Object.keys(currentSchema.fields);
      
      const isStepValid = await trigger(fields as (keyof RegisterFormData)[]);
      
      if (isStepValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const onSubmit = async (data: RegisterFormData) => {
      setLoading(true);
      setError(null);
      
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, termsAccepted, ...registerData } = data;
        
        await registerUser(registerData);
        navigate('/');
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Erro ao criar conta. Tente novamente.');
        } else {
          setError('Erro ao criar conta. Tente novamente.');
        }
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <MainLayout withoutChat>
        <Container maxWidth="md">
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              borderRadius: 2
            }}
          >
            <Box component="img" src={logo} alt="FURIA Logo" sx={{ height: 80, mb: 2 }} />
            
            <Typography variant="h4" component="h1" gutterBottom>
              Crie sua conta FURIA
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            <FormProvider {...methods}>
              <Box component="form" noValidate sx={{ width: '100%', mt: 1 }}>
                <CurrentStep />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                  >
                    Voltar
                  </Button>
                  
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit(onSubmit)}
                      disabled={loading || !isValid}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Criar Conta'}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      Próximo
                    </Button>
                  )}
                </Box>
              </Box>
            </FormProvider>
            
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2">
                Já tem uma conta?{' '}
                <Link to="/login" style={{ color: '#00c2ff', textDecoration: 'none' }}>
                  Faça login
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </MainLayout>
    );
  };
  
  export default Register;