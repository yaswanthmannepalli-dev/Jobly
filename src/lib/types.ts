export type JobStatus = "active" | "expired" | "unverified";

export type JobCategory =
  | "Development"
  | "Design"
  | "Marketing"
  | "Data"
  | "Sales"
  | "Support";

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  workMode?: "Remote" | "Hybrid" | "On-site";
  salaryMin?: number;
  salaryMax?: number;
  experience: string;
  category: JobCategory;
  postedAt: string; // ISO date
  deadline?: string; // ISO date
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  applicationUrl: string;
  source: string;
  featured?: boolean;
  verified: boolean;
  status: JobStatus;
}
