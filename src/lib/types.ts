export interface JobPosting {
  jobTitle: string;
  department: string;
  location: string;
  salaryRange: string;
  teamSize: number;
  workType: string;
  responsibilities: string;
  requirements: string;
  reportsTo: string;
  specificationFileUrl: string;
  postedBy: string;
  postedAt: Date;
}

export interface Job extends JobPosting {
  id: string;
}