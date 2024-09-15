"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, Search, Star, Bell, Pause, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

// Add StarRating component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))}
  </div>
);

// Define the Job and Applicant interfaces
interface Job {
  id: number;
  title: string;
  department: string;
  type: string;
  hired: number;
  total: number;
}

interface Applicant {
  id: number;
  name: string;
  avatar: string;
  score: number;
  stage: string;
  date: string;
}

const applicants: Applicant[] = [
  // ... (your applicants data)
];

export default function JobApplicants() {
  const { user } = useAuth();
  const params = useParams();
  const id = params.id as string;
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    // Fetch job details using the id
    // This is a placeholder, replace with actual API call
    const fetchJob = async () => {
      // const jobData = await fetchJobById(id);
      // setJob(jobData);
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link href="/dashboard" className="mr-4">
                    <ArrowLeft className="h-6 w-6 text-gray-500" />
                  </Link>
                  <h1 className="text-2xl font-semibold text-gray-900">{job ? job.title : 'Loading...'}</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        More actions <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pause className="mr-2 h-4 w-4" />
                        <span>Pause job</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <X className="mr-2 h-4 w-4" />
                        <span>Close job</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">{job ? `${job.department} • ${job.type} • ${job.hired} / ${job.total} Hired` : 'Loading...'}</div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Total Applicants: {applicants.length}</h2>
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Search Applicants"
                        className="w-64"
                        icon={<Search className="h-4 w-4 text-gray-400" />}
                      />
                      <Button variant="outline">
                        Filter
                      </Button>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Full Name</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Hiring Stage</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applicants.map((applicant) => (
                        <TableRow key={applicant.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={applicant.avatar} alt={applicant.name} />
                                <AvatarFallback>{applicant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              {applicant.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <StarRating rating={applicant.score} />
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              applicant.stage === "Hired" ? "success" :
                              applicant.stage === "Declined" ? "destructive" :
                              applicant.stage === "Interview" ? "warning" :
                              "secondary"
                            }>
                              {applicant.stage}
                            </Badge>
                          </TableCell>
                          <TableCell>{applicant.date}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" asChild>
                              <Link href={`/candidates/${applicant.id}`}>
                                View Application
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination component here */}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}