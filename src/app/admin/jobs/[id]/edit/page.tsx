import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getCategories } from "@/app/actions/categories"
import { auth } from "@/auth"

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const categories = await getCategories()
  const { id } = await params
  
  const job = await prisma.job.findUnique({
    where: { id }
  })

  if (!job) notFound()

  async function updateJob(formData: FormData) {
    "use server"
    
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");
    
    const title = formData.get("title") as string
    const company = formData.get("company") as string
    const location = formData.get("location") as string
    const type = formData.get("type") as string
    const experience = formData.get("experience") as string || "Not specified"
    const category = formData.get("category") as string
    const description = formData.get("description") as string
    const applicationUrl = formData.get("applicationUrl") as string
    const salaryMinStr = formData.get("salaryMin") as string
    const salaryMaxStr = formData.get("salaryMax") as string
    const salaryMin = salaryMinStr ? parseInt(salaryMinStr) : null
    const salaryMax = salaryMaxStr ? parseInt(salaryMaxStr) : null
    const status = formData.get("status") as string
    const featured = formData.get("featured") === "on"
    const batch = formData.get("batch") as string || null
    const isInternship = formData.get("isInternship") === "on"
    const isFresher = formData.get("isFresher") === "on"

    // Parse newline-separated strings into JSON arrays
    const parseArray = (str: string) => JSON.stringify(str.split('\\n').map(s => s.trim()).filter(Boolean))
    const responsibilities = parseArray(formData.get("responsibilities") as string || "")
    const requirements = parseArray(formData.get("requirements") as string || "")
    const skills = parseArray(formData.get("skills") as string || "")

    await prisma.job.update({
      where: { id },
      data: {
        title,
        company,
        location,
        type,
        experience,
        category,
        salaryMin,
        salaryMax,
        featured,
        description,
        responsibilities,
        requirements,
        skills,
        applicationUrl,
        status,
        batch,
        isInternship,
        isFresher,
      }
    })

    revalidatePath("/")
    revalidatePath("/categories")
    revalidatePath("/jobs")
    revalidatePath(`/jobs/${id}`)
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
            <p className="mt-1 text-xs text-muted">"About [Company]" section is automatically generated.</p>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Location</label>
            <input name="location" defaultValue={job.location} placeholder="e.g. Bangalore, Remote" required className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Experience</label>
            <input name="experience" defaultValue={job.experience} placeholder="e.g. 3+ years, Entry level" required className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple" />
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
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">Status</label>
            <select name="status" defaultValue={job.status} className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple">
              <option value="active">Active (Visible)</option>
              <option value="archived">Archived (Hidden)</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Batch (Optional)</label>
            <input name="batch" defaultValue={job.batch || ""} placeholder="e.g. 2024" className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple" />
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isInternship" name="isInternship" defaultChecked={job.isInternship} className="h-5 w-5 rounded border-line text-purple focus:ring-purple" />
            <label htmlFor="isInternship" className="text-sm font-medium text-foreground cursor-pointer">Internship</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isFresher" name="isFresher" defaultChecked={job.isFresher} className="h-5 w-5 rounded border-line text-purple focus:ring-purple" />
            <label htmlFor="isFresher" className="text-sm font-medium text-foreground cursor-pointer">Fresher / Entry Level</label>
          </div>
        </div>
        
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Description (Job Overview)</label>
          <textarea name="description" defaultValue={job.description} rows={4} required className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple"></textarea>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Responsibilities (One per line)</label>
          <textarea name="responsibilities" defaultValue={JSON.parse(job.responsibilities || "[]").join('\\n')} rows={4} placeholder="E.g.&#10;Develop features&#10;Write clean code" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple"></textarea>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Requirements (One per line)</label>
          <textarea name="requirements" defaultValue={JSON.parse(job.requirements || "[]").join('\\n')} rows={4} placeholder="E.g.&#10;3+ years experience&#10;React.js expert" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple"></textarea>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Job Highlights / Skills (One per line)</label>
          <textarea name="skills" defaultValue={JSON.parse(job.skills || "[]").join('\\n')} rows={3} placeholder="E.g.&#10;TypeScript&#10;Remote Work" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple"></textarea>
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
