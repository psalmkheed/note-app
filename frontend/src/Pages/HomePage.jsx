import {
  NotebookPen,
  ArrowRight,
  ShieldCheck,
  Cloud,
  Zap,
  Search,
  Plus,
  CheckCircle2,
  Clock3,
  Menu,
  Sparkles,
  Layers3,
  LockKeyhole
} from "lucide-react";

import { Link } from "react-router";
import Navbar from "../Components/Navbar";

const features = [
  {
    icon: NotebookPen,
    title: "Effortless Note Taking",
    description:
      "Capture your thoughts, ideas, and important information in one clean and organized space."
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description:
      "Your notes belong to you. Enjoy secure access to your personal notes whenever you need them."
  },
  {
    icon: Search,
    title: "Find Notes Faster",
    description:
      "Spend less time searching and more time doing. Keep your ideas organized and accessible."
  },
  {
    icon: Cloud,
    title: "Access Anywhere",
    description:
      "Keep your thoughts within reach whenever inspiration strikes."
  },
  {
    icon: Zap,
    title: "Built for Productivity",
    description:
      "A simple and distraction-free experience that helps you focus on what matters."
  },
  {
    icon: Layers3,
    title: "Stay Organized",
    description:
      "Keep your personal notes structured and make managing your ideas easier."
  }
];

const HomePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-base-100">

      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      <Navbar />

      <main>

        {/* HERO SECTION */}
        <section className="container mx-auto px-6 pt-20 pb-24 lg:pt-28">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* Hero content */}
            <div className="max-w-2xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
                <Sparkles size={16} />
                Your thoughts deserve a better home
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Capture your ideas.
                <span className="block text-primary">
                  Organize your life.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-base-content/70 md:text-lg">
                A simple and beautiful space to write down your thoughts,
                organize your ideas, and keep everything that matters in one
                place.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">

                <Link
                  to="/auth/register"
                  className="btn btn-primary gap-2"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/auth/login"
                  className="btn btn-outline"
                >
                  Sign In
                </Link>

              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-base-content/60">

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-primary" />
                  Simple to use
                </div>

                <div className="flex items-center gap-2">
                  <LockKeyhole size={17} className="text-primary" />
                  Private workspace
                </div>

                <div className="flex items-center gap-2">
                  <Zap size={17} className="text-primary" />
                  Productivity focused
                </div>

              </div>

            </div>

            {/* Hero dashboard preview */}
            <div className="relative">

              <div className="absolute -inset-5 rounded-3xl bg-primary/10 blur-3xl" />

              <div className="card relative border border-base-content/10 bg-base-200/80 shadow-2xl backdrop-blur-xl">

                <div className="card-body p-5 sm:p-7">

                  {/* Preview header */}
                  <div className="mb-6 flex items-center justify-between">

                    <div>
                      <p className="text-sm text-base-content/50">
                        Your workspace
                      </p>

                      <h2 className="text-xl font-bold">
                        My Notes
                      </h2>
                    </div>

                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <NotebookPen size={23} />
                    </div>

                  </div>

                  {/* Search */}
                  <div className="mb-5 flex items-center gap-3 rounded-xl border border-base-content/10 bg-base-100 px-4 py-3">

                    <Search size={18} className="text-base-content/40" />

                    <span className="text-sm text-base-content/40">
                      Search your notes...
                    </span>

                  </div>

                  {/* Note cards */}
                  <div className="space-y-3">

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">

                      <div className="mb-3 flex items-center justify-between">

                        <span className="badge badge-primary badge-outline">
                          Personal
                        </span>

                        <Clock3 size={16} className="text-base-content/40" />

                      </div>

                      <h3 className="font-semibold">
                        Ideas for the future
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-base-content/60">
                        Every great achievement starts with a simple idea.
                        Keep writing, keep building...
                      </p>

                      <p className="mt-4 text-xs text-base-content/40">
                        Updated recently
                      </p>

                    </div>

                    <div className="rounded-xl border border-base-content/10 bg-base-100 p-4">

                      <div className="mb-3 flex items-center justify-between">

                        <span className="badge badge-success badge-outline">
                          Work
                        </span>

                        <Clock3 size={16} className="text-base-content/40" />

                      </div>

                      <h3 className="font-semibold">
                        Project planning
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-base-content/60">
                        Outline the next milestones, features, and tasks for
                        the upcoming project.
                      </p>

                      <p className="mt-4 text-xs text-base-content/40">
                        Updated yesterday
                      </p>

                    </div>

                    <div className="rounded-xl border border-base-content/10 bg-base-100 p-4">

                      <span className="badge badge-secondary badge-outline">
                        Learning
                      </span>

                      <h3 className="mt-3 font-semibold">
                        Backend engineering
                      </h3>

                      <p className="mt-2 text-sm text-base-content/60">
                        Things to learn and practice this week...
                      </p>

                    </div>

                  </div>

                  {/* Add note button */}
                  <div className="mt-5 flex items-center justify-between">

                    <p className="text-xs text-base-content/50">
                      Your ideas, all in one place.
                    </p>

                    <button className="btn btn-primary btn-sm btn-circle">
                      <Plus size={19} />
                    </button>

                  </div>

                </div>

              </div>

              {/* Floating notification */}
              <div className="absolute -bottom-7 -left-5 hidden items-center gap-3 rounded-2xl border border-base-content/10 bg-base-200 p-4 shadow-xl sm:flex">

                <div className="rounded-full bg-success/10 p-2 text-success">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Stay organized
                  </p>

                  <p className="text-xs text-base-content/50">
                    One idea at a time.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* FEATURES SECTION */}
        <section className="container mx-auto px-6 py-24">

          <div className="mx-auto mb-16 max-w-2xl text-center">

            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why choose us?
            </span>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Everything you need to stay organized
            </h2>

            <p className="mt-5 leading-7 text-base-content/60">
              Focus on your ideas while we give you a simple space to capture,
              manage, and revisit them.
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="card border border-base-content/10 bg-base-200/60 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl"
                >

                  <div className="card-body">

                    <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={24} />
                    </div>

                    <h3 className="card-title text-lg">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-base-content/60">
                      {feature.description}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* CTA SECTION */}
        <section className="container mx-auto px-6 py-20">

          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/10 px-6 py-16 text-center md:px-16">

            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-2xl">

              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <NotebookPen size={30} />
              </div>

              <h2 className="text-3xl font-bold md:text-4xl">
                Your next great idea starts here.
              </h2>

              <p className="mt-5 leading-7 text-base-content/70">
                Stop keeping everything in your head. Create your personal
                workspace and start organizing your thoughts today.
              </p>

              <Link
                to="/auth/register"
                className="btn btn-primary mt-8 gap-2"
              >
                Create Your Account
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-base-content/10">

        <div className="container mx-auto flex flex-col items-center justify-between gap-5 px-6 py-8 sm:flex-row">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <NotebookPen size={21} />
            </div>

            <span className="font-bold tracking-tight">
              MyNoteApp
            </span>

          </div>

          <p className="text-center text-sm text-base-content/50">
            © {new Date().getFullYear()} MyNoteApp. Made for your ideas.
          </p>

          <div className="flex gap-5 text-sm text-base-content/60">

            <Link to="/auth/login" className="hover:text-primary">
              Login
            </Link>

            <Link to="/auth/register" className="hover:text-primary">
              Register
            </Link>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default HomePage;