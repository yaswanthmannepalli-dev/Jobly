"use client";

import Link from "next/link";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import Pagination from "@/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { deleteJob } from "@/app/actions/jobs"; // We will create this or use existing

interface Job {
  id: string;
  title: string;
  company: string;
  status: string;
  postedAt: string;
  featured: boolean;
}

interface AdminJobsClientProps {
  jobs: Job[];
  totalPages: number;
  currentPage: number;
  initialQuery: string;
  initialStatus: string;
}

export default function AdminJobsClient({ jobs, totalPages, currentPage, initialQuery, initialStatus }: AdminJobsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState(initialStatus);

  // When query or status changes, we want to update the URL
  // But for query, we should probably submit via a form or button to avoid too many requests
  // Let's use a form submission for search

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (query) params.set("q", query);
    else params.delete("q");
    
    if (status !== "all") params.set("status", status);
    else params.delete("status");
    
    router.push(`/admin/jobs?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/admin/jobs?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      await deleteJob(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
          <p className="text-muted-foreground">Manage job postings and their status.</p>
        </div>
        <Link 
          href="/admin/jobs/new"
          className="flex items-center gap-2 rounded-xl bg-purple px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-dark transition shrink-0"
        >
          <Plus size={16} />
          Post New Job
        </Link>
      </div>

      {/* Filters */}
      <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-line shadow-sm">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Search by title or company..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface/50 border border-line rounded-xl text-sm focus:outline-purple"
          />
        </div>
        <div className="w-full sm:w-48">
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2.5 bg-surface/50 border border-line rounded-xl text-sm focus:outline-purple appearance-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button 
          type="submit"
          className="px-6 py-2.5 bg-purple text-white rounded-xl text-sm font-medium hover:bg-purple-dark transition"
        >
          Search
        </button>
      </form>

      <div className="rounded-2xl border border-line bg-white shadow-sm overflow-hidden mb-6">
        <table className="w-full text-left text-sm text-muted">
          <thead className="bg-surface/50 text-foreground border-b border-line">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Company</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Posted</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted">
                  No jobs found matching your criteria.
                </td>
              </tr>
            ) : (
              jobs.map((job: Job) => (
                <tr key={job.id} className="hover:bg-surface/50 transition">
                  <td className="px-6 py-4 font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      {job.title}
                      {job.featured && (
                        <span className="inline-flex rounded-full bg-purple-tint px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-dark">
                          Editor&apos;s Pick
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">{job.company}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(job.postedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/jobs/${job.id}/edit`} className="text-muted hover:text-purple transition">
                        <Pencil size={16} />
                      </Link>
                      <button onClick={() => handleDelete(job.id)} className="text-muted hover:text-red-500 transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
