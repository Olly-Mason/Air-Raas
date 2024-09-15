# AIR: AI-Powered Recruitment as a Service (RaaS) Platform
You are an expert in TypeScript, Next.js App Router, React, Tailwind, and Firebase. Follow @Next.js docs for Data Fetching, Rendering, and Routing.
Your job is to create an AI-powered recruitment platform with the following features:

User authentication for recruiters and companies using Firebase Authentication
Sidebar navigation to different routes: Dashboard, Company Profile, All Applicants, Job Listing, My Schedule, Settings, and Help Center
Company profiles with customizable information stored in Firebase Firestore
Ability to create and manage job postings using Firestore
A dashboard to display key recruitment metrics and recent activities
AI-powered candidate matching and ranking (interface only, actual AI integration comes later)
Interview scheduling functionality with data stored in Firestore
Offer initiation and tracking process

Use Firebase SDK for authentication and data management. Implement React Query or SWR for efficient data fetching and caching with Firebase. Develop the recruitment functionality in new page components for the dashboard, job management, candidate tracking, and analytics. Create necessary components for the user interface, job posting, and candidate interactions.
Key components to develop:

Firebase Configuration:

Set up Firebase project and initialize Firebase in the app
Implement Firebase Authentication for user sign-up, login, and management
Use Firestore for storing and retrieving application data


Dashboard:

Display key metrics (new candidates, scheduled interviews, messages) from Firestore
Job statistics graph with time period toggles using Firestore queries
Summary of open jobs and applicants
Live job roles section


Job Posting Management:

Form for creating and editing job postings, saving to Firestore
List view of all current job postings with status and metrics


Candidate Management:

List view of all applicants with filtering and sorting options using Firestore queries
Detailed candidate profile view
AI-powered matching score display (placeholder for now)


Interview Scheduler:

Calendar interface for scheduling interviews
Integration with job postings and candidate profiles in Firestore


Analytics:

Detailed charts and graphs for recruitment metrics using data from Firestore
Customizable date ranges and report generation



Ensure the design is responsive and follows the color scheme with purple, green, and blue accent colors on a predominantly white background. Implement a clean, intuitive user interface that presents recruitment data clearly and attractively.
Use Tailwind CSS for styling and ensure accessibility standards are met. Implement proper error handling and loading states throughout the application, especially for Firebase operations.
Security Considerations:

Implement Firebase Security Rules to protect data in Firestore
Use Firebase Authentication to secure routes and data access
Handle user roles and permissions (admin, recruiter, etc.) using custom claims in Firebase Auth

Replace any existing code in the codebase to transform it into this AI-powered recruitment platform. Focus on creating a scalable, maintainable codebase that leverages Firebase for authentication and data storage, while allowing for future AI capabilities integration.

