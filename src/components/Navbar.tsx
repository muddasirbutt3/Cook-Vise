import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiHeart,
  FiUser,
  FiGrid,
  FiBookOpen,
  FiShoppingCart,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useUser } from "../context/UserContext";
import { logoutUser } from "../services/auth.services";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-2 py-2 text-sm font-medium transition sm:px-3 focus-visible:outline-2 focus-visible:outline-cream ${
    isActive
      ? "bg-cream/15 text-cream"
      : "text-cream/80 hover:bg-cream/10 hover:text-cream"
  }`;

const menuItemClass =
  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-charcoal transition hover:bg-forest-tint";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (err: any) {}
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-forest-dark bg-forest shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-4">
        {/* Left: logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          aria-label="Cook Vise home"
        >
          <img
            src="/favicon.png"
            alt="logo"
            className="h-9 w-9 rounded-lg object-contain"
          />
          <span className="hidden font-[Fraunces,serif] text-xl font-semibold text-cream sm:inline">
            Cook Vise
          </span>
        </Link>

        {/* Right: links + favorites + avatar */}
        <nav className="flex items-center gap-0.5 sm:gap-2">
          <NavLink to="/explore" className={linkClass}>
            Explore
          </NavLink>
          <NavLink to="/community" className={linkClass}>
            Community
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/favorites"
                aria-label="Favorites"
                className={({ isActive }) =>
                  `rounded-lg p-2 transition hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-cream ${
                    isActive
                      ? "text-orange-soft"
                      : "text-cream/80 hover:text-cream"
                  }`
                }
              >
                {({ isActive }) => (
                  <FiHeart
                    size={20}
                    className={isActive ? "fill-current" : ""}
                  />
                )}
              </NavLink>

              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  aria-label="Account menu"
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-cream text-forest transition hover:ring-2 hover:ring-orange-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FiUser size={18} />
                  )}
                </button>

                {open && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-60 rounded-xl border border-line bg-white p-1.5 text-charcoal shadow-lg"
                  >
                    <div className="border-b border-line px-3 py-2">
                      <p className="truncate text-sm font-semibold">
                        {user.displayName}
                      </p>
                      {user.email && (
                        <p className="truncate text-xs text-muted">
                          {user.email}
                        </p>
                      )}
                    </div>

                    <div className="mt-1.5 space-y-0.5">
                      <Link
                        to="/"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className={menuItemClass}
                      >
                        <FiGrid aria-hidden="true" /> Dashboard
                      </Link>
                      <Link
                        to="/my-recipes"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className={menuItemClass}
                      >
                        <FiBookOpen aria-hidden="true" /> My Recipes
                      </Link>
                      <Link
                        to="/shopping-list"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className={menuItemClass}
                      >
                        <FiShoppingCart aria-hidden="true" /> Shopping List
                      </Link>
                      <Link
                        to="/profile"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className={menuItemClass}
                      >
                        <FiSettings aria-hidden="true" /> Profile & settings
                      </Link>
                    </div>

                    <div className="mt-1.5 border-t border-line pt-1.5">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-danger transition hover:bg-danger-tint"
                      >
                        <FiLogOut aria-hidden="true" /> Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg border border-cream/40 px-2.5 py-2 text-sm font-medium text-cream transition hover:bg-cream/10 sm:px-3.5"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-orange-soft px-2.5 py-2 text-sm font-semibold text-forest-dark transition hover:bg-cream sm:px-3.5"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
