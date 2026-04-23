import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/shop", label: "Products" },
  { href: "/categories/hfd-duty", label: "HFD Duty" },
  { href: "/categories/hfd-explorers", label: "HFD Explorers" },
  { href: "/categories/flow-iv", label: "Flow IV" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-neutral-950 text-neutral-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <h3 className="text-lg font-semibold text-white">Defend Freedom Industries</h3>
          <p className="mt-3 max-w-lg text-sm text-neutral-400">
            Premium apparel built for firefighters, police, EMS, military families, and everyone who stands for service.
          </p>
          <p className="mt-4 text-sm">
            Contact: <a className="text-amber-300 hover:text-amber-200" href="mailto:defendfreedomindustries@gmail.com">defendfreedomindustries@gmail.com</a>
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-200">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {FOOTER_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-200">Built For</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            <li>Firefighters</li>
            <li>EMS + Medics</li>
            <li>Military Families</li>
            <li>Patriot Supporters</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
