import { CTA } from "./CTA";
import { DashboardPreview } from "./DashboardPreview";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Navbar } from "./Navbar";
import { Pricing } from "./Pricing";
import { Resources } from "./Resources";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 lg:px-8 lg:py-8">
        <Hero />
        <Features />
        <HowItWorks />
        <DashboardPreview />
        <Pricing />
        <Resources />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
