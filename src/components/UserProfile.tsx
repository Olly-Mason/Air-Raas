import React from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Name:</strong> {user.displayName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Verification Status:</strong> {user.emailVerified ? 'Verified' : 'Pending'}</p>
        {/* Add more user details as needed */}
      </CardContent>
    </Card>
  );
};

export default UserProfile;