import Link from "next/link";

const applications = [
  {
    company: "Nova Studio",
    title: "Frontend Developer",
    status: "Applied",
    location: "Remote",
    appliedDate: "Jun 18, 2026",
  },
  {
    company: "BrightApps",
    title: "Junior Full-Stack Engineer",
    status: "Interviewing",
    location: "New York, NY",
    appliedDate: "Jun 16, 2026",
  },
  {
    company: "CloudPeak",
    title: "React Developer",
    status: "Offer",
    location: "Austin, TX",
    appliedDate: "Jun 12, 2026",
  },
  {
    company: "PixelWorks",
    title: "Web Developer",
    status: "Applied",
    location: "Chicago, IL",
    appliedDate: "Jun 9, 2026",
  },
  {
    company: "LaunchGrid",
    title: "UI Engineer",
    status: "Saved",
    location: "San Francisco, CA",
    appliedDate: "Jun 5, 2026",
  },
];

export default function ApplicationsPage() {
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
              Review your saved demo applications in one organized list.
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
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                defaultValue="all"
              >
                <option value="all">All statuses</option>
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

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
                {applications.map((application) => (
                  <tr key={`${application.company}-${application.title}`}>
                    <td className="px-6 py-4 font-medium">
                      {application.company}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {application.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {application.location}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {application.appliedDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
