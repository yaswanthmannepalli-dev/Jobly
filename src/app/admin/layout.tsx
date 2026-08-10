import Link from "next/link"
import { Briefcase, LayoutDashboard, LogOut, Users, Settings, Layers, BarChart3 } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-line bg-white flex flex-col">
        <div className="flex h-16 items-center border-b border-line px-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            NXT<span className="text-purple">Admin</span>
          </Link>
        </div>
        
        <nav className="flex flex-col gap-1 px-4 mt-8">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted hover:bg-surface hover:text-foreground transition"
          >
            <BarChart3 size={18} className="text-muted" />
            Dashboard
          </Link>
          <Link 
            href="/admin/jobs" 
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted hover:bg-surface hover:text-foreground transition"
          >
            <Briefcase size={18} className="text-muted" />
            Jobs
          </Link>
          <Link 
            href="/admin/categories" 
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted hover:bg-surface hover:text-foreground transition"
          >
            <Layers size={18} className="text-muted" />
            Categories
          </Link>
          <Link 
            href="/admin/subscribers" 
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted hover:bg-surface hover:text-foreground transition"
          >
            <Users size={18} className="text-muted" />
            Subscribers
          </Link>
          <Link 
            href="/admin/cms" 
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted hover:bg-surface hover:text-foreground transition"
          >
            <Settings size={18} className="text-muted" />
            Content (CMS)
          </Link>
        </nav>

        <div className="p-4 border-t border-line">
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition">
              <LogOut size={18} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
