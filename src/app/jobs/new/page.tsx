"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BarChart, Users, Briefcase, Calendar, Settings, HelpCircle, MessageSquare, ChevronRight } from 'lucide-react';
import JobPostingForm from '@/components/JobPostingForm';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/hooks/useAuth";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  notificationCount?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href, active = false, notificationCount = 0 }) => (
  <li>
    <Link href={href} className={`flex items-center justify-between px-4 py-2 rounded-lg ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
      <div className="flex items-center space-x-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      {notificationCount > 0 && (
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {notificationCount}
        </span>
      )}
    </Link>
  </li>
);

export default function NewJobPage() {
  const { user } = useAuth();
  const unreadMessages = 5;
  const router = useRouter();

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
              <SidebarItem icon={<BarChart className="w-5 h-5" />} label="Dashboard" href="/dashboard" />
              <SidebarItem icon={<Users className="w-5 h-5" />} label="Company Profile" href="/company-profile" />
              <SidebarItem icon={<Users className="w-5 h-5" />} label="All Applicants" href="/applicants" />
              <SidebarItem icon={<Briefcase className="w-5 h-5" />} label="Job Listing" href="/jobs" active />
              <SidebarItem icon={<Calendar className="w-5 h-5" />} label="My Schedule" href="/schedule" />
              <SidebarItem 
                icon={<MessageSquare className="w-5 h-5" />} 
                label="Messages" 
                href="/messages"
                notificationCount={unreadMessages}
              />
              <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" href="/settings" />
              <SidebarItem icon={<HelpCircle className="w-5 h-5" />} label="Help Center" href="/help" />
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
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <button onClick={() => router.push('/dashboard')} className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </button>
            </div>
            <JobPostingForm />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}