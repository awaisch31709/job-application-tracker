"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function NewApplicationPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Saved");
  const [salaryRange, setSalaryRange] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function checkUser() {
      const supabase = createBrowserSupabaseClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUserId(user.id);
    }

    checkUser();
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!companyName.trim() || !jobTitle.trim()) {
      setErrorMessage("Company Name and Job Title are required.");
      return;
    }

    if (!userId) {
      setErrorMessage("Please log in before saving an application.");
      return;
    }

    setLoading(true);

    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("applications").insert({
      user_id: userId,
      company_name: companyName,
      job_title: jobTitle,
      job_url: jobUrl,
      location,
      status,
      salary_range: salaryRange,
      applied_date: appliedDate || null,
      notes,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccessMessage("Application saved successfully. Redirecting...");

    setTimeout(() => {
      router.push("/applications");
    }, 1500);
  }

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
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-center text-sm font-medium text-slate-800 transition hover:bg-slate-100"
            >
              Dashboard
            </Link>
            <Link
              href="/applications"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-center text-sm font-medium text-slate-800 transition hover:bg-slate-100"
            >
              Applications
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Job search
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Add Application
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Save the main details for a job opportunity you want to track.
          </p>
        </div>

        <form
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="company-name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Company Name
              </label>
              <input
                id="company-name"
                name="company-name"
                type="text"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                placeholder="Nova Studio"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="job-title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Job Title
              </label>
              <input
                id="job-title"
                name="job-title"
                type="text"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                placeholder="Frontend Developer"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="job-url"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Job URL
              </label>
              <input
                id="job-url"
                name="job-url"
                type="url"
                value={jobUrl}
                onChange={(event) => setJobUrl(event.target.value)}
                placeholder="https://example.com/job"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Remote"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              >
                <option value="Saved">Saved</option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="salary-range"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Salary Range
              </label>
              <input
                id="salary-range"
                name="salary-range"
                type="text"
                value={salaryRange}
                onChange={(event) => setSalaryRange(event.target.value)}
                placeholder="$60,000 - $80,000"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="applied-date"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Applied Date
              </label>
              <input
                id="applied-date"
                name="applied-date"
                type="date"
                value={appliedDate}
                onChange={(event) => setAppliedDate(event.target.value)}
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={5}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Add notes about the role, recruiter, interview details, or follow-up steps."
                className="w-full resize-y rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          {errorMessage ? (
            <p className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </p>
          ) : null}

          {successMessage ? (
            <p className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {successMessage}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/applications"
              className="rounded-md border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Saving..." : "Save Application"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
