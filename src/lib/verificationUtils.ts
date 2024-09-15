import { db } from '@/lib/firebase/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

export const isApprovedDomain = async (email: string): Promise<boolean> => {
  const domain = email.split('@')[1];
  const q = query(collection(db, "approvedDomains"), where("domain", "==", domain));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const generateVerificationCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const isValidVerificationCode = (code: string): boolean => {
  // Implement your validation logic here
  return code.length === 6 && /^[A-Z0-9]+$/.test(code);
};