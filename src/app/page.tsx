import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8 border-b border-border/40 bg-background/50 backdrop-blur-md">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight">SpendPilot</span>
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <span className="text-sm font-semibold leading-6 text-muted-foreground">
              SpendPilot helps startups cut unnecessary AI spending in minutes.
            </span>
          </div>
          <div className="flex flex-1 justify-end">
            <Link href="/audit" className="text-sm font-semibold leading-6 bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
              Start Free Audit <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-border/80">
              Stop overpaying for AI tool subscriptions.{' '}
              <Link href="/audit" className="font-semibold text-primary">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
            Audit your AI spend in seconds, not hours.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Stop guessing if you're on the right plan. SpendPilot analyzes your AI tool usage and surfaces instant savings. Most startups save 20%+ on their monthly bills.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/audit"
              className="rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all flex items-center gap-2"
            >
              Get My Free Audit <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Optimize Better</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to rightsizing your AI stack
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
                  Instant On-Screen Audit
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">See exactly where you're overspending and where to downgrade or switch for immediate savings.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
                  AI-Powered Summaries
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">Get a personalized, data-driven summary of your AI infrastructure costs and optimization path.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                  No Login Required
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">Analyze your spend without the friction of account creation. Value first, capture later.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
