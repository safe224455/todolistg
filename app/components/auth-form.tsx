'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../hooks/use-auth';

export function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp, loading } = useAuth();

  const handleSubmit = async (isSignUp: boolean) => {
    const action = isSignUp ? signUp : signIn;
    await action(email, password);
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Welcome to Project Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2">
          <Button 
            onClick={() => handleSubmit(false)} 
            disabled={loading}
            className="flex-1"
          >
            Sign In
          </Button>
          <Button 
            onClick={() => handleSubmit(true)} 
            disabled={loading}
            variant="outline"
            className="flex-1"
          >
            Sign Up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}