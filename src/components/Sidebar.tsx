'use client';
import Link from "next/link";
import { useAuth } from "../lib/hooks/useAuth";
import { BarChart, Users, Briefcase, Calendar, Settings, HelpCircle, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  notificationCount?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href, active = false, notificationCount = 0 }) => (
  <li>
    <Link href={href} className={`flex items-center justify-between px-4 py-2 rounded-lg ${active ? 'bg-blue-100 text-blue-600' : 'text-white hover:bg-purple-600'}`}>
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

export default function Sidebar() {
  const { signOut } = useAuth();
  const unreadMessages = 5;

  return (
    <nav className="w-64 bg-purple-700 text-white h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">AIR Recruitment</h1>
      <ul className="space-y-2 flex-grow">
        <SidebarItem icon={<BarChart className="w-5 h-5" />} label="Dashboard" href="/dashboard" active />
        <SidebarItem icon={<Users className="w-5 h-5" />} label="Company Profile" href="/company-profile" />
        <SidebarItem icon={<Users className="w-5 h-5" />} label="All Applicants" href="/applicants" />
        <SidebarItem icon={<Briefcase className="w-5 h-5" />} label="Job Listings" href="/jobs" />
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
      <Button 
        onClick={signOut} 
        className="mt-auto bg-red-500 text-white hover:bg-red-600"
      >
        Sign Out
      </Button>
    </nav>
  );
}