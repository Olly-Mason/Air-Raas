import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProfilePhotoUpload from './ProfilePhotoUpload';
import PersonalDetailsForm from './PersonalDetailsForm';
import { useUserProfile } from '@/lib/hooks/useUserProfile';
import { UserProfile } from '@/lib/types';

export default function UserProfileSettings() {
  const { userProfile, updateUserProfile, loading, error } = useUserProfile();
  const [activeTab, setActiveTab] = useState('profile');

  const handleSaveProfile = async (updatedProfile: Partial<UserProfile>) => {
    if (userProfile) {
      await updateUserProfile(updatedProfile);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="login">Login Details</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <p className="text-sm text-gray-500">This is your personal information that you can update anytime.</p>
              </div>
              <ProfilePhotoUpload
                currentPhotoUrl={userProfile?.photoURL}
                onPhotoUpload={(url) => handleSaveProfile({ photoURL: url })}
              />
              <PersonalDetailsForm
                userProfile={userProfile}
                onSave={handleSaveProfile}
              />
              {error && <p className="text-red-500">{error}</p>}
              <div>
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => userProfile && handleSaveProfile(userProfile)}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="login">
            <p>Login details content goes here.</p>
          </TabsContent>
          <TabsContent value="notifications">
            <p>Notifications settings content goes here.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}