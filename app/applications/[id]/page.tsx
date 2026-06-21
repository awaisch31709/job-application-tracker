"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type Application = {
  id: string;
  company_name: string;
  job_title: string;
  job_url: string | null;
  location: string | null;
  status: string;
  salary_range: string | null;
  applied_date: string | null;
  notes: string | null;
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

export default function ApplicationDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadApplication() {
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
          "id, company_name, job_title, job_url, location, status, salary_range, applied_date, notes",
        )
        .eq("id", params.id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      setApplication(data);
      setLoading(false);
    }

    loadApplication();
  }, [params.id, router]);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setErrorMessage("");

    const supabase = createBrowserSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("id", params.id)
      .eq("user_id", user.id);

    setDeleting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push("/applications");
  }

  const details = application
    ? [
        { label: "Company Name", value: application.company_name },
        { label: "Job Title", value: application.job_title },
        { label: "Job URL", value: application.job_url || "Not added" },
        { label: "Location", value: application.location || "Not added" },
        { label: "Status", value: application.status },
        { label: "Salary Range", value: application.salary_range || "Not added" },
        { label: "Applied Date", value: formatDate(application.applied_date) },
      ]
    : [];

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
              href="/applications"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
            >
              Applications
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        {loading ? (
          <p className="rounded-lg border border-slate-200 bg-white px-6 py-4 text-sm font-medium text-slate-600 shadow-sm">
            Loading application...
          </p>
        ) : errorMessage ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : !application ? (
          <div className="rounded-lg border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
            <h1 className="text-2xl font-bold tracking-tight">
              Application not found
            </h1>
            <p className="mt-3 text-slate-600">
              This application may not exist, or it may not belong to your
              account.
            </p>
            <Link
              href="/applications"
              className="mt-6 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to Applications
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Application details
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {application.job_title}
                </h1>
                <p className="mt-3 max-w-2xl text-slate-600">
                  Review the main details for this job application.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <Link
                  href="/applications"
                  className="rounded-md border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  Back to Applications
                </Link>
                <Link
                  href={`/applications/${application.id}/edit`}
                  className="rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Edit Application
                </Link>
              </div>
            </div>

            <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {application.company_name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Saved application details from your tracker.
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                    {application.status}
                  </span>
                </div>
              </div>

              <div className="grid gap-5 px-6 py-6 md:grid-cols-2">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <p className="text-sm font-medium text-slate-500">
                      {detail.label}
                    </p>
                    {detail.label === "Job URL" && application.job_url ? (
                      <a
                        href={application.job_url}
                        className="mt-2 block break-words font-medium text-slate-950 underline decoration-slate-300 underline-offset-4 hover:text-slate-700"
                      >
                        {application.job_url}
                      </a>
                    ) : (
                      <p className="mt-2 font-medium text-slate-950">
                        {detail.value}
                      </p>
                    )}
                  </div>
                ))}

                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-slate-500">Notes</p>
                  <p className="mt-2 rounded-md bg-slate-50 p-4 leading-7 text-slate-700">
                    {application.notes || "No notes added."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end">
                <Link
                  href="/applications"
                  className="rounded-md border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  Back to Applications
                </Link>
                <Link
                  href={`/applications/${application.id}/edit`}
                  className="rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Edit Application
                </Link>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-md border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:bg-red-50 disabled:text-red-300"
                >
                  {deleting ? "Deleting..." : "Delete Application"}
                </button>
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
