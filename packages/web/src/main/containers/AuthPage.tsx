import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';

import { authService, onAuthorizationCodeReceived } from '../../auth';

const Title = styled.h1({ textAlign: 'center' });
const Container = styled.div({
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
});

const AuthPage: React.FC = () => {
  useEffect(() => {
    onAuthorizationCodeReceived(window.location.search);
  }, []);
  const { t } = useTranslation();

  return (
    <Container>
      <Card>
        <CardContent>
          <Stack alignItems="center">
            <Title>{t('loginPageMessage')}</Title>
            <Button onClick={authService.authorize}>{t('loginButton')}</Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AuthPage;
