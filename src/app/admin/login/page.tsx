"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError("Invalid credentials")
    } else {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="mb-6 text-sm text-muted">Sign in to manage NXT postings.</p>
        
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-line bg-surface px-4 py-2 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-line bg-surface px-4 py-2 text-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-purple px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-dark"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
