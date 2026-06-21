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
  location: string | null;
  applied_date: string | null;
  created_at: string;
};

function formatDate(date: string | null) {
  if (!date) {
    return "Not added";
  }

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadApplications() {
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
        .select(
          "id, company_name, job_title, status, location, applied_date, created_at",
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      setApplications(data ?? []);
      setLoading(false);
    }

    loadApplications();
  }, [router]);

  const filteredApplications = applications.filter((application) => {
    const searchValue = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !searchValue ||
      application.company_name.toLowerCase().includes(searchValue) ||
      application.job_title.toLowerCase().includes(searchValue);
    const matchesStatus =
      selectedStatus === "All statuses" ||
      application.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            JobTrackr
          </Link>

          <nav className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
            >
              Dashboard
            </Link>
            <Link
              href="/applications/new"
              className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Add Application
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Job search
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Applications
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Review your saved applications in one organized list.
            </p>
          </div>

          <Link
            href="/applications/new"
            className="rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add Application
          </Link>
        </div>

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-4 border-b border-slate-200 px-6 py-5 md:grid-cols-[1fr_220px]">
            <div>
              <label htmlFor="search" className="sr-only">
                Search applications
              </label>
              <input
                id="search"
                name="search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by company or job title"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label htmlFor="status" className="sr-only">
                Filter by status
              </label>
              <select
                id="status"
                name="status"
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              >
                <option value="All statuses">All statuses</option>
                <option value="Saved">Saved</option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="px-6 py-8 text-sm font-medium text-slate-600">
              Loading applications...
            </p>
          ) : errorMessage ? (
            <p className="m-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          ) : applications.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <h2 className="text-lg font-semibold">No applications yet</h2>
              <p className="mt-2 text-sm text-slate-500">
                Add your first job application to start tracking your search.
              </p>
              <Link
                href="/applications/new"
                className="mt-5 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Add Application
              </Link>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <h2 className="text-lg font-semibold">
                No matching applications
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Try changing your search text or status filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50 text-sm text-slate-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">Company</th>
                    <th className="px-6 py-3 font-medium">Job Title</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Location</th>
                    <th className="px-6 py-3 font-medium">Applied Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredApplications.map((application) => (
                    <tr key={application.id}>
                      <td className="px-6 py-4 font-medium">
                        {application.company_name}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/applications/${application.id}`}
                          className="font-medium text-slate-950 hover:text-slate-700"
                        >
                          {application.job_title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {application.location || "Not added"}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {formatDate(application.applied_date)}
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
