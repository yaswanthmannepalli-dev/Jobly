// Static Categories
export const categories = [
  { name: "Development", icon: "code" },
  { name: "Design", icon: "pen" },
  { name: "Marketing", icon: "megaphone" },
  { name: "Data", icon: "chart" },
  { name: "Sales", icon: "handshake" },
  { name: "Support", icon: "life-buoy" },
];

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMins < 60) {
    if (diffInMins <= 0) return "Just now";
    return `${diffInMins} min${diffInMins !== 1 ? "s" : ""} ago`;
  }
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function deadlineLabel(deadline?: string): string {
  if (!deadline) return "Open";
  const d = new Date(deadline);
  const diff = d.getTime() - new Date().getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (days < 0) return "Expired";
  if (days === 0) return "Ends today";
  if (days === 1) return "Ends tomorrow";
  return `Ends in ${days} days`;
}
