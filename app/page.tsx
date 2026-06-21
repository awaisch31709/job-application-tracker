import Link from "next/link";

const features = [
  {
    title: "Track job applications",
    description:
      "Keep every company, role, and application date in one clear place.",
  },
  {
    title: "Manage application status",
    description:
      "Follow each opportunity from saved to applied, interviewing, offer, or rejected.",
  },
  {
    title: "Stay organized during job search",
    description:
      "Review your progress quickly and focus on the next best follow-up.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            JobTrackr
          </Link>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/login"
              className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Job search made simpler
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Track your job applications without losing momentum.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            JobTrackr helps you organize applications, monitor statuses, and
            stay focused throughout your job search.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-md bg-slate-950 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Applications tracked
              </p>
              <p className="text-3xl font-bold text-slate-950">12</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              Active
            </span>
          </div>

          <div className="space-y-3">
            <div className="rounded-md border border-slate-200 p-4">
              <p className="font-semibold">Frontend Developer</p>
              <p className="text-sm text-slate-500">Applied at Nova Studio</p>
            </div>
            <div className="rounded-md border border-slate-200 p-4">
              <p className="font-semibold">Junior Full-Stack Engineer</p>
              <p className="text-sm text-slate-500">Interviewing at BrightApps</p>
            </div>
            <div className="rounded-md border border-slate-200 p-4">
              <p className="font-semibold">React Developer</p>
              <p className="text-sm text-slate-500">Saved for follow-up</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-950">
                {feature.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
