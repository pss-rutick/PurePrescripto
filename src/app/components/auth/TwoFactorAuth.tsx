import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Shield, Lock } from 'lucide-react';

interface TwoFactorAuthProps {
  onVerify: () => void;
  onCancel: () => void;
  userName: string;
}

export function TwoFactorAuth({ onVerify, onCancel, userName }: TwoFactorAuthProps) {
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    // In a real app, this would verify the OTP with the backend
    if (otp.length === 6) {
      onVerify();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
            <CardDescription>
              DEA EPCS Identity Proofing Required
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-900">
                    Secure Authentication Required
                  </p>
                  <p className="text-xs text-blue-700">
                    A 6-digit verification code has been sent to your registered device for user: <strong>{userName}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-center">
                <label className="text-sm font-medium">Enter Verification Code</label>
              </div>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleVerify}
                disabled={otp.length !== 6}
              >
                Verify & Continue
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t space-y-3">
            <div className="text-center">
              <button className="text-sm text-blue-600 hover:underline">
                Resend verification code
              </button>
            </div>
            <div className="text-center text-xs text-slate-500">
              This verification is required for DEA EPCS compliance
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs text-amber-800">
              <strong>Security Notice:</strong> Your session will timeout after 15 minutes of inactivity for security purposes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
