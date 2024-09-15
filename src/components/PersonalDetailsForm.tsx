import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserProfile } from '@/lib/types';

interface PersonalDetailsFormProps {
  userProfile: UserProfile | null;
  onSave: (updatedProfile: Partial<UserProfile>) => void;
}

export default function PersonalDetailsForm({ userProfile, onSave }: PersonalDetailsFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onSave({ [name]: value });
  };

  const handleSelectChange = (name: string) => (value: string) => {
    onSave({ [name]: value });
  };

  return (
    <div>
      <h4 className="font-medium mb-4">Personal Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={userProfile?.fullName || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={userProfile?.phone || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={userProfile?.email || ''}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            name="dob"
            type="date"
            value={userProfile?.dob || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={userProfile?.gender || ''}
            onValueChange={handleSelectChange('gender')}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-medium mb-4">Account Type</h4>
        <RadioGroup
          value={userProfile?.accountType || 'employer'}
          onValueChange={handleSelectChange('accountType')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="employer" id="employer" />
            <Label htmlFor="employer">Employer</Label>
          </div>
          <p className="text-sm text-gray-500 ml-6">Hiring, sourcing candidates, or posting jobs</p>
        </RadioGroup>
      </div>
    </div>
  );
}