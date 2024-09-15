"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { addJobPosting } from '@/lib/firebase/firebase';
import { notifyNewJobPosting } from '@/lib/jobNotifications';
import { JobPosting } from '@/lib/types';
import FileUpload from './FileUpload';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function JobPostingForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<JobPosting>({
    jobTitle: '',
    department: '',
    location: '',
    salaryRange: '',
    teamSize: 0,
    workType: '',
    responsibilities: '',
    requirements: '',
    reportsTo: '',
    specificationFileUrl: '',
    postedBy: '',
    postedAt: new Date(),
  });
  const [file, setFile] = useState<File | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions');
      setIsSubmitting(false);
      return;
    }

    try {
      await addJobPosting(formData, file, user?.uid);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to post job. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Post a New Job</CardTitle>
        <CardDescription>Fill in the details below to create a new job posting.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="e.g. Senior Frontend Developer" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Input id="department" name="department" value={formData.department} onChange={handleInputChange} placeholder="e.g. Engineering" required />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. New York, NY" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salaryRange">Salary Range</Label>
                <Input id="salaryRange" name="salaryRange" value={formData.salaryRange} onChange={handleInputChange} placeholder="e.g. $80,000 - $120,000" required />
              </div>
              <div>
                <Label htmlFor="teamSize">Team Size</Label>
                <Input id="teamSize" name="teamSize" type="number" value={formData.teamSize} onChange={handleInputChange} placeholder="e.g. 5" required />
              </div>
            </div>
            <div>
              <Label htmlFor="workType">Work Type</Label>
              <Select onValueChange={handleSelectChange('workType')}>
                <SelectTrigger id="workType">
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="responsibilities">Key Responsibilities</Label>
              <Textarea id="responsibilities" name="responsibilities" value={formData.responsibilities} onChange={handleInputChange} placeholder="List the main responsibilities for this role" required />
            </div>
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleInputChange} placeholder="List the key requirements for this role" required />
            </div>
            <div>
              <Label htmlFor="reportsTo">Reports To</Label>
              <Input id="reportsTo" name="reportsTo" value={formData.reportsTo} onChange={handleInputChange} placeholder="e.g. Engineering Manager" required />
            </div>
            <FileUpload onFileSelect={setFile} />
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)} />
              <Label htmlFor="terms">I agree to the terms and conditions</Label>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post Job'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}