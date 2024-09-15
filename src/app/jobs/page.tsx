"use client";

import { useEffect, useState } from "react";
import { getDocuments } from "../../lib/firebase/firebaseUtils";
import JobPostingForm from "../../components/JobPostingForm";

interface Job {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsData = await getDocuments("jobs");
      setJobs(jobsData as Job[]);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Job Listings</h1>
      <JobPostingForm />
      <div className="mt-8">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white shadow rounded p-4 mb-4">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="mt-2">{job.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Posted on: {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}