import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const job = await prisma.job.findUnique({
    where: { id }
  })

  if (!job) notFound()

  async function updateJob(formData: FormData) {
    "use server"
    
    const title = formData.get("title") as string
    const company = formData.get("company") as string
    const location = formData.get("location") as string
    const type = formData.get("type") as string
    const category = formData.get("category") as string
    const description = formData.get("description") as string
    const applicationUrl = formData.get("applicationUrl") as string
    const salaryMinStr = formData.get("salaryMin") as string
    const salaryMaxStr = formData.get("salaryMax") as string
    const salaryMin = salaryMinStr ? parseInt(salaryMinStr) : null
    const salaryMax = salaryMaxStr ? parseInt(salaryMaxStr) : null
    const status = formData.get("status") as string
    const featured = formData.get("featured") === "on"

    await prisma.job.update({
      where: { id },
      data: {
        title,
        company,
        location,
        type,
        category,
        salaryMin,
        salaryMax,
        featured,
        description,
        applicationUrl,
        status,
      }
    })

    redirect("/admin/jobs")
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground">Edit Job: {job.title}</h1>
      
      <form action={updateJob} className="flex flex-col gap-6 rounded-2xl border border-line bg-white p-8 shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Job Title</label>
            <input name="title" defaultValue={job.title} required className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Company Name</label>
            <input name="company" defaultValue={job.company} required className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Location</label>
            <input name="location" defaultValue={job.location} placeholder="e.g. Bangalore, Remote" required className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Minimum Salary (₹)</label>
            <input name="salaryMin" defaultValue={job.salaryMin || ""} type="number" placeholder="e.g. 500000" className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Maximum Salary (₹)</label>
            <input name="salaryMax" defaultValue={job.salaryMax || ""} type="number" placeholder="e.g. 1500000" className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Application URL</label>
            <input name="applicationUrl" defaultValue={job.applicationUrl} type="url" required className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Job Type</label>
            <select name="type" defaultValue={job.type} className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Category</label>
            <select name="category" defaultValue={job.category} className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple">
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Data">Data</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">Status</label>
            <select name="status" defaultValue={job.status} className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple">
              <option value="active">Active (Visible)</option>
              <option value="archived">Archived (Hidden)</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
          <textarea name="description" defaultValue={job.description} rows={8} required className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple"></textarea>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-line bg-surface/50 p-4">
          <input type="checkbox" id="featured" name="featured" defaultChecked={job.featured} className="h-5 w-5 rounded border-line text-purple focus:ring-purple" />
          <label htmlFor="featured" className="text-sm font-medium text-foreground cursor-pointer">
            Set as Editor's Pick (Featured Job)
          </label>
        </div>

        <button type="submit" className="mt-4 w-full md:w-auto self-end rounded-xl bg-purple px-8 py-3 text-sm font-medium text-white hover:bg-purple-dark transition">
          Save Changes
        </button>
      </form>
    </div>
  )
}
