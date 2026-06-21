import Link from "next/link";

export default function EditApplicationPage() {
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
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Job search
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Edit Application
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Update the demo details for this job application.
          </p>
        </div>

        <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
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
                defaultValue="Nova Studio"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
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
                defaultValue="Frontend Developer"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
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
                defaultValue="https://example.com/jobs/frontend-developer"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
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
                defaultValue="Remote"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
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
                defaultValue="applied"
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              >
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
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
                defaultValue="$65,000 - $85,000"
                className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
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
                defaultValue="2026-06-18"
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
                defaultValue="Applied through the company careers page. Follow up next week if there is no response."
                className="w-full resize-y rounded-md border border-slate-300 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/applications/1"
              className="rounded-md border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              Cancel
            </Link>
            <button
              type="button"
              className="rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
