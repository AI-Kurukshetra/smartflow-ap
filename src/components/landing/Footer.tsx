import Link from "next/link";

const footerLinks = [
  { label: "Product", href: "#platform" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#who-we-serve" },
  { label: "Contact", href: "/login" },
  { label: "Privacy", href: "/signup" },
];

export function Footer() {
  return (
    <footer className="rounded-3xl border border-slate-100 bg-white px-6 py-8 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-600">MedStack</p>
          <p className="text-sm text-slate-500">
            Healthcare infrastructure for modern provider and patient experiences.
          </p>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm font-medium text-slate-600">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-teal-600">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
