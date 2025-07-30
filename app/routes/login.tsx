import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

import type { Route } from './+types/login';
import { Card, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Login' }, { name: 'description', content: 'Login' }];
}

export default function Login() {
  const navigate = useNavigate();
  const [urlSearchParams] = useSearchParams();
  const accessToken = urlSearchParams.get('access_token');

  const handleGoogleLoginClick = () => {
    window.location.href = 'http://localhost:8000/api/v1/auth/google/login';
  };

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('token', accessToken);

      window.location.href = '/';
    }
  }, [accessToken]);

  return (
    <Card>
      <CardContent>
        <Button variant="outline" className="w-full" onClick={handleGoogleLoginClick}>
          Login with Google
        </Button>
      </CardContent>
    </Card>
  );
}
