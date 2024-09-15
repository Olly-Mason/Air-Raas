import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { Job } from '@/lib/types';

export const useRecentJobs = (limitCount: number = 5) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const jobsQuery = query(
      collection(db, 'jobPostings'),
      orderBy('postedAt', 'desc'),
      limit(limitCount)
    );

    const unsubscribe = onSnapshot(
      jobsQuery,
      (snapshot) => {
        const newJobs = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            postedAt: data.postedAt?.toDate() || new Date(), // Convert Firestore Timestamp to Date
          } as Job;
        });
        setJobs(newJobs);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching recent jobs:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [limitCount]);

  return { jobs, loading, error };
};