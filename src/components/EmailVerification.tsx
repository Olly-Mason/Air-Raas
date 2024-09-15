import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { verifyEmail } from '@/lib/firebase/firebase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EmailVerification: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await verifyEmail(verificationCode);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid verification code. Please try again.');
      console.error(err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="verificationCode">Verification Code</Label>
            <Input
              id="verificationCode"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit">Verify</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailVerification;