import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Job } from '@/lib/types';

interface JobListingItemProps {
  job: Job;
}

const JobListingItem: React.FC<JobListingItemProps> = ({ job }) => {
  const formattedDate = job.postedAt instanceof Date && !isNaN(job.postedAt.getTime())
    ? formatDistanceToNow(job.postedAt, { addSuffix: true })
    : 'Invalid date';

  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
      <p className="text-sm text-gray-600">{job.department} • {job.location}</p>
      <p className="text-xs text-gray-500 mt-1">Posted {formattedDate}</p>
    </div>
  );
};

export default JobListingItem;