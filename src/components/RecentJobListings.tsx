import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import JobListingItem from './JobListingItem';
import { useRecentJobs } from '@/lib/hooks/useRecentJobs';

const RecentJobListings: React.FC = () => {
  const { jobs, loading, error } = useRecentJobs(5); // Fetch 5 most recent jobs

  if (loading) {
    return <div>Loading recent job listings...</div>;
  }

  if (error) {
    return <div>Error loading recent job listings: {error.message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Job Postings</CardTitle>
      </CardHeader>
      <CardContent>
        {jobs.map((job) => (
          <JobListingItem key={job.id} job={job} />
        ))}
        <Button asChild className="w-full mt-4">
          <Link href="/jobs">View All Jobs</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentJobListings;