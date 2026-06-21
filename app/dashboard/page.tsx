"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type Application = {
  id: string;
  company_name: string;
  job_title: string;
  status: string;
  created_at: string;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const supabase = createBrowserSupabaseClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("applications")
        .select("id, company_name, job_title, status, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setErrorMessage(error.message);
        setCheckingAuth(false);
        return;
      }

      setApplications(data ?? []);
      setCheckingAuth(false);
    }

    loadDashboard();
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);

    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();

    router.push("/login");
  }

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-950">
        <p className="rounded-lg border border-slate-200 bg-white px-6 py-4 text-sm font-medium text-slate-600 shadow-sm">
          Checking authentication...
        </p>
      </main>
    );
  }

  const summaryCards = [
    { label: "Total Applications", value: applications.length },
    {
      label: "Applied",
      value: applications.filter((application) => application.status === "Applied")
        .length,
    },
    {
      label: "Interviewing",
      value: applications.filter(
        (application) => application.status === "Interviewing",
      ).length,
    },
    {
      label: "Offers",
      value: applications.filter((application) => application.status === "Offer")
        .length,
    },
  ];

  const recentApplications = applications.slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            JobTrackr
          </Link>

          <nav className="flex flex-wrap gap-3">
            <Link
              href="/applications/new"
              className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Add Application
            </Link>
            <Link
              href="/applications"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
            >
              View All Applications
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Here is a quick snapshot of your job search progress.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <article
              key={card.label}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <p className="mt-3 text-3xl font-bold text-slate-950">
                {card.value}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Recent Applications</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your latest saved job applications.
              </p>
            </div>
            <Link
              href="/applications"
              className="text-sm font-semibold text-slate-950 hover:text-slate-700"
            >
              View All Applications
            </Link>
          </div>

          {errorMessage ? (
            <p className="m-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          ) : recentApplications.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <h3 className="text-lg font-semibold">No applications yet</h3>
              <p className="mt-2 text-sm text-slate-500">
                Add your first application to see your dashboard stats.
              </p>
              <Link
                href="/applications/new"
                className="mt-5 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Add Application
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">
                <thead className="bg-slate-50 text-sm text-slate-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">Company</th>
                    <th className="px-6 py-3 font-medium">Role</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {recentApplications.map((application) => (
                    <tr key={application.id}>
                      <td className="px-6 py-4 font-medium">
                        {application.company_name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {application.job_title}
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {formatDate(application.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
