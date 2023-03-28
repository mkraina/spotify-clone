import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardContent, Stack } from '@mui/material';
import styled from 'styled-components';

import { authService, onAuthorizationCodeReceived } from '../../auth';

const Title = styled.h1({ textAlign: 'center' });
const Container = styled.div({
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
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
            <Title>{t('loginScreenMessage')}</Title>
            <Button onClick={authService.authorize}>{t('loginButton')}</Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AuthPage;
