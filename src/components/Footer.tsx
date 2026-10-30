import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

const columns = [
  {
    title: "Discover",
    links: [
      { label: "Explore recipes", to: "/explore" },
      { label: "Community", to: "/community" },
      { label: "Breakfast", to: "/explore?category=breakfast" },
      { label: "Desserts", to: "/explore?category=dessert" },
    ],
  },
  {
    title: "Your kitchen",
    links: [
      { label: "Favorites", to: "/favorites" },
      { label: "My Recipes", to: "/my-recipes" },
      { label: "Shopping List", to: "/shopping-list" },
      { label: "Profile", to: "/profile" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", to: "/terms-conditions" },
      { label: "Privacy Policy", to: "/privacy-policy" },
    ],
  },
];

// TODO: replace the "#" with your own profile links
const socials = [
  { label: "GitHub", href: "#", icon: FaGithub },
  { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
  { label: "Instagram", href: "#", icon: FaInstagram },
];

const footerLinkClass =
  "text-sm text-cream/70 transition hover:text-orange-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-4 border-orange-soft bg-forest text-cream">
      {/* soft decorative circles */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-soft/10" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cream/5" />

      <div className="relative mx-auto max-w-6xl px-4 pb-6 pt-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              aria-label="Cook Vise home"
            >
              <img
                src="/favicon.png"
                alt=""
                className="h-10 w-10 rounded-lg object-contain ring-1 ring-cream/25"
              />
              <span className="font-[Fraunces,serif] text-2xl font-semibold">
                Cook Vise
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Find something good to cook tonight. Search recipes, save your
              favorites, and share your own with the community.
            </p>

            <div className="mt-5 flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition hover:border-orange-soft hover:bg-orange-soft hover:text-forest-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-[Fraunces,serif] text-lg font-semibold text-cream">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={footerLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Cook Vise. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with{" "}
            <FiHeart className="text-orange-soft" aria-hidden="true" /> for home
            cooks
          </p>
        </div>
      </div>
    </footer>
  );
}
