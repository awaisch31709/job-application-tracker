import Link from "next/link";

const application = {
  company: "Nova Studio",
  title: "Frontend Developer",
  url: "https://example.com/jobs/frontend-developer",
  location: "Remote",
  status: "Applied",
  salaryRange: "$65,000 - $85,000",
  appliedDate: "Jun 18, 2026",
  notes:
    "Applied through the company careers page. Follow up next week if there is no response.",
};

const details = [
  { label: "Company Name", value: application.company },
  { label: "Job Title", value: application.title },
  { label: "Job URL", value: application.url },
  { label: "Location", value: application.location },
  { label: "Status", value: application.status },
  { label: "Salary Range", value: application.salaryRange },
  { label: "Applied Date", value: application.appliedDate },
];

export default function ApplicationDetailsPage() {
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
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Application details
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {application.title}
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Review the main details for this demo job application.
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
              href="/applications/1/edit"
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
                  {application.company}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Static demo data for one application.
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
                {detail.label === "Job URL" ? (
                  <a
                    href={detail.value}
                    className="mt-2 block break-words font-medium text-slate-950 underline decoration-slate-300 underline-offset-4 hover:text-slate-700"
                  >
                    {detail.value}
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
                {application.notes}
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
              href="/applications/1/edit"
              className="rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Edit Application
            </Link>
            <button
              type="button"
              className="rounded-md border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50"
            >
              Delete Application
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}
