import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/shop", label: "Shop All" },
  { href: "/categories/hfd-duty", label: "HFD Duty" },
  { href: "/categories/hfd-explorers", label: "HFD Explorers" },
  { href: "/shop?q=hat", label: "Headwear" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-zinc-50 text-zinc-700">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-[0.12em] text-zinc-900">Defend Freedom Industries</h3>
          <p className="mt-3 max-w-lg text-sm text-zinc-600">
            Premium apparel for firefighters, EMS, and service-focused communities. Built to work hard, wear well, and represent with pride.
          </p>
          <p className="mt-4 text-sm">
            Contact: <a className="font-semibold text-orange-600 hover:text-orange-500" href="mailto:defendfreedomindustries@gmail.com">defendfreedomindustries@gmail.com</a>
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {FOOTER_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-zinc-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">Built For</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            <li>Firefighters</li>
            <li>EMS + Medics</li>
            <li>Academy + Explorers</li>
            <li>Patriot Supporters</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
