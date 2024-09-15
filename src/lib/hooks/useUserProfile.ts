import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { getUserProfile, updateUserProfileInFirestore } from '../firebase/firebase';
import { UserProfile } from '../types';

export function useUserProfile() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (err) {
          setError('Failed to fetch user profile');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchUserProfile();
  }, [user]);

  const updateUserProfile = async (updatedProfile: Partial<UserProfile>) => {
    if (user && userProfile) {
      setLoading(true);
      try {
        const updatedFullProfile = { ...userProfile, ...updatedProfile } as UserProfile;
        await updateUserProfileInFirestore(user.uid, updatedFullProfile);
        setUserProfile(updatedFullProfile);
      } catch (err) {
        setError('Failed to update user profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return { userProfile, updateUserProfile, loading, error };
}