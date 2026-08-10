import { prisma } from "@/lib/prisma"
import { Users, Mail, Clock } from "lucide-react"

export default async function SubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Newsletter Subscribers</h1>
        <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 border border-line shadow-sm">
          <Users size={18} className="text-purple" />
          <span className="font-semibold">{subscribers.length} Total</span>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-foreground">
            <thead className="bg-surface text-muted border-b border-line">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Email Address</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Subscribed On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-12 text-center text-muted">
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="transition-colors hover:bg-surface/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple/10 text-purple">
                          <Mail size={18} />
                        </div>
                        <span className="font-medium">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-muted flex items-center justify-end gap-2 h-full min-h-[72px]">
                      <Clock size={16} />
                      {new Date(sub.createdAt).toLocaleDateString(undefined, { 
                        year: 'numeric', month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
