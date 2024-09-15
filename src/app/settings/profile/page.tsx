"use client";

import UserProfileSettings from '@/components/UserProfileSettings';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfileSettingsPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-semibold mb-6">User Profile Settings</h1>
        <UserProfileSettings />
      </div>
    </ProtectedRoute>
  );
}