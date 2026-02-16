import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Lock, Shield, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl">e-Prescribe Platform</CardTitle>
            <CardDescription>
              HIPAA-Compliant Electronic Prescribing System
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@healthsystem.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </form>

          <div className="space-y-4">
            <div className="text-center">
              <button className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </button>
            </div>

            <div className="pt-4 border-t space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                <Shield className="h-4 w-4" />
                <span>HIPAA Compliant • DEA EPCS Certified</span>
              </div>
              <div className="text-center text-xs text-slate-500">
                Last login: February 12, 2026 at 3:45 PM EST
              </div>
            </div>
          </div>

          <div className="space-y-2 text-center text-xs text-slate-500">
            <p>Demo Credentials:</p>
            <p><strong>Doctor:</strong> priya.deshmukh@healthsys.com / password</p>
            <p><strong>Pharmacist:</strong> robert.chen@pharmacy.com / password</p>
            <p><strong>Admin:</strong> admin@healthsys.com / password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
