import { Briefcase, Eye, TrendingUp, Users } from "lucide-react"
import { getDashboardMetrics } from "@/app/actions/getMetrics"
import DashboardCharts from "@/components/DashboardCharts"

export default async function AdminDashboard() {
  const metrics = await getDashboardMetrics();

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Active Jobs */}
        <div className="bg-white p-6 rounded-2xl border border-line shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-purple/10 flex items-center justify-center text-purple">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm text-muted font-medium">Active Jobs</p>
            <p className="text-2xl font-bold text-foreground">{metrics.activeJobs}</p>
          </div>
        </div>

        {/* Total Jobs */}
        <div className="bg-white p-6 rounded-2xl border border-line shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-muted font-medium">Total Jobs</p>
            <p className="text-2xl font-bold text-foreground">{metrics.totalJobs}</p>
          </div>
        </div>

        {/* Visitors Today */}
        <div className="bg-white p-6 rounded-2xl border border-line shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-muted font-medium">Visitors Today</p>
            <p className="text-2xl font-bold text-foreground">{metrics.visitsToday}</p>
          </div>
        </div>

        {/* Total Visitors */}
        <div className="bg-white p-6 rounded-2xl border border-line shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
            <Eye size={24} />
          </div>
          <div>
            <p className="text-sm text-muted font-medium">Total Page Views</p>
            <p className="text-2xl font-bold text-foreground">{metrics.totalVisits}</p>
          </div>
        </div>
      </div>

      {/* Analytics Chart */}
      <DashboardCharts data={metrics.visitsChartData} />

      {/* Top Performing Jobs */}
      <div className="mt-8 bg-white p-6 rounded-2xl border border-line shadow-sm">
        <h2 className="text-xl font-bold text-foreground mb-6">Top Performing Jobs</h2>
        {metrics.topJobs.length === 0 ? (
          <p className="text-muted">No job views recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-muted">
              <thead className="bg-surface/50 text-foreground border-b border-line">
                <tr>
                  <th className="px-6 py-4 font-semibold rounded-tl-xl">Job Title</th>
                  <th className="px-6 py-4 font-semibold">Company</th>
                  <th className="px-6 py-4 font-semibold text-right rounded-tr-xl">Total Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {metrics.topJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-surface/50 transition">
                    <td className="px-6 py-4 font-medium text-foreground">{job.title}</td>
                    <td className="px-6 py-4">{job.company}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple/10 text-purple font-semibold">
                        <Eye size={14} /> {job.views}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
