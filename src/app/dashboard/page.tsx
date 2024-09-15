"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, BarChart, Users, Briefcase, Calendar, Settings, HelpCircle, ChevronDown, Plus, MessageSquare } from 'lucide-react';
import { useAuth } from "../../lib/hooks/useAuth";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import RecentJobListings from "@/components/RecentJobListings";
import { getDocuments } from "@/lib/firebase/firebaseUtils";

// Add these interfaces at the top of the file
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  notificationCount?: number;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

interface JobCardProps {
  id: number;
  title: string;
  department: string;
  location: string;
  applicants: number;
}

// Update the component definitions
const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active = false, notificationCount = 0 }) => (
  <li className={`flex items-center justify-between px-4 py-2 rounded-lg ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
    <div className="flex items-center space-x-3">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    {notificationCount > 0 && (
      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        {notificationCount}
      </span>
    )}
  </li>
);

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const JobCard: React.FC<JobCardProps> = ({ id, title, department, location, applicants }) => (
  <Card className="flex flex-col justify-between">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      <div className="flex space-x-2 mt-2">
        <Badge variant="secondary">{department}</Badge>
        <Badge variant="outline">{location}</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-500">{applicants} applicants</p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm" className="w-full" asChild>
        <Link href={`/jobs/${id}`}>View Applicants</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function DashboardPage() {
  const { user } = useAuth();
  const unreadMessages = 5;
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsData = await getDocuments("jobPostings");
      setJobs(jobsData as Job[]);
    };

    fetchJobs();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-blue-600">AIR</h1>
          </div>
          <nav className="mt-6">
            <ul className="space-y-2">
              <SidebarItem icon={<BarChart className="w-5 h-5" />} label="Dashboard" active />
              <SidebarItem icon={<Users className="w-5 h-5" />} label="Company Profile" />
              <SidebarItem icon={<Users className="w-5 h-5" />} label="All Applicants" />
              <SidebarItem icon={<Briefcase className="w-5 h-5" />} label="Job Listing" />
              <SidebarItem icon={<Calendar className="w-5 h-5" />} label="My Schedule" />
              <SidebarItem 
                icon={<MessageSquare className="w-5 h-5" />} 
                label="Messages" 
                notificationCount={unreadMessages}
              />
              <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" />
              <SidebarItem icon={<HelpCircle className="w-5 h-5" />} label="Help Center" />
            </ul>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user?.photoURL || "/placeholder.svg?height=40&width=40"} alt="User" />
                <AvatarFallback>{user?.displayName?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user?.displayName || 'User'}</p>
                <p className="text-sm text-gray-500">HR Manager</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-8 py-4">
              <h2 className="text-2xl font-semibold text-gray-800">AIR Dashboard</h2>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
                <Link href="/jobs/new" passHref>
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Post a Job
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back, {user?.displayName || 'User'}!</h1>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard title="Candidates to Review" value="24" icon={<Users className="w-4 h-4 text-blue-600" />} />
              <StatCard title="Scheduled Interviews" value="8" icon={<Calendar className="w-4 h-4 text-blue-600" />} />
              <StatCard title="New Messages" value={unreadMessages.toString()} icon={<MessageSquare className="w-4 h-4 text-blue-600" />} />
            </div>

            {/* Live Job Roles */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Live Job Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      id={job.id}
                      title={job.jobTitle}
                      department={job.department}
                      location={job.location}
                      applicants={0} // You might want to add an applicants count to your Job type
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ... (keep other dashboard content) */}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}