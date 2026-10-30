import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUsers,
  FiArrowRight,
  FiPlus,
  FiBookOpen,
} from "react-icons/fi";
import {
  GiCroissant,
  GiHamburger,
  GiNoodles,
  GiCakeSlice,
  GiCarrot,
  GiStopwatch,
} from "react-icons/gi";
import type { IconType } from "react-icons";
import RecipeCard from "../components/RecipeCard";
import type { RecipeCardData } from "../components/RecipeCard";
import Container from "../components/Container";
import { useUser } from "../context/UserContext";

const categories: { label: string; slug: string; icon: IconType }[] = [
  { label: "Breakfast", slug: "breakfast", icon: GiCroissant },
  { label: "Lunch", slug: "lunch", icon: GiHamburger },
  { label: "Dinner", slug: "dinner", icon: GiNoodles },
  { label: "Dessert", slug: "dessert", icon: GiCakeSlice },
  { label: "Vegan", slug: "vegan", icon: GiCarrot },
  { label: "Quick", slug: "quick", icon: GiStopwatch },
];
const shortcuts: {
  label: string;
  text: string;
  to: string;
  icon: IconType;
}[] = [
  {
    label: "Favorites",
    text: "Recipes you've saved",
    to: "/favorites",
    icon: FiHeart,
  },
  {
    label: "My Recipes",
    text: "Recipes you've created",
    to: "/my-recipes",
    icon: FiBookOpen,
  },
  {
    label: "Shopping List",
    text: "What to buy next",
    to: "/shopping-list",
    icon: FiShoppingCart,
  },
];

const features: { title: string; text: string; icon: IconType }[] = [
  {
    title: "Discover and save",
    text: "Browse thousands of recipes and keep your favorites one tap away.",
    icon: FiHeart,
  },
  {
    title: "Shop smarter",
    text: "Add a recipe's ingredients to your shopping list in one click.",
    icon: FiShoppingCart,
  },
  {
    title: "Share with others",
    text: "Post your own recipes to the community and see what others cook.",
    icon: FiUsers,
  },
];

// TODO: replace with data from the external API
const trending: RecipeCardData[] = Array.from({ length: 4 }, (_, i) => ({
  id: String(i + 1),
  title: "Recipe title goes here",
  time: 30,
  servings: 4,
}));

// TODO: replace with data from Firebase (recipes where isPublic is true)
const communityRecipes: RecipeCardData[] = Array.from(
  { length: 4 },
  (_, i) => ({
    id: String(i + 1),
    title: "Community recipe title",
    time: 25,
    servings: 2,
    author: "Chef name",
  }),
);

function SectionHeader({
  title,
  subtitle,
  to,
}: {
  title: string;
  subtitle?: string;
  to?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-[Fraunces,serif] text-2xl font-semibold text-forest">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {to && (
        <Link
          to={to}
          className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-orange-deep hover:underline"
        >
          View all <FiArrowRight aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search == "") return;
    navigate(`/explore?q=${String(search)}`);
  };

  return (
    <div className="space-y-14">
      <section className="relative flex min-h-[480px] items-center overflow-hidden bg-forest-dark md:min-h-[560px]">
        {/* Background image */}
        <img
          src={"/banner.png"}
          alt="Banner"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Color overlay: change the /70 to make it lighter or darker */}
        <div className="absolute inset-0 bg-forest-dark/70" />

        {/* Content */}
        <div className="relative mx-auto w-full max-w-6xl px-4 py-16">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-orange-soft px-3 py-1 text-xs font-semibold text-forest-dark">
              Thousands of recipes, one kitchen
            </span>

            <h1 className="mt-5 font-[Fraunces,serif] text-4xl font-semibold leading-tight text-cream sm:text-5xl lg:text-6xl">
              Find something good to cook tonight.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/85 sm:text-lg">
              Search recipes, save your favorites, and build shopping lists, all
              in one place.
            </p>

            <form onSubmit={handleSearch} className="mt-8 flex max-w-lg gap-2">
              <div className="relative flex-1">
                <FiSearch
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  name="q"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Try pasta, chicken, or vegan..."
                  className="w-full rounded-full border border-transparent bg-white py-3.5 pl-11 pr-4 text-sm text-charcoal outline-none transition placeholder:text-muted/70 focus:border-orange-soft focus:ring-2 focus:ring-orange-soft/40"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-orange-soft px-6 py-3.5 text-sm font-semibold text-forest-dark transition hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                Search
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/explore"
                className="flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-forest transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                Explore Recipes <FiArrowRight aria-hidden="true" />
              </Link>
              <Link
                to="/community"
                className="rounded-full border border-cream/50 px-6 py-3 text-sm font-medium text-cream transition hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                See Community
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Container className="space-y-14">
        {/* 2. Categories */}
        <section>
          <SectionHeader
            title="Browse by category"
            subtitle="Pick a meal and start exploring."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ label, slug, icon: Icon }) => (
              <Link
                key={slug}
                to={`/explore?category=${slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-line bg-white px-4 py-5 text-center transition hover:border-forest/40 hover:shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-tint text-forest transition group-hover:bg-forest group-hover:text-cream">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Trending (API) */}
        <section>
          <SectionHeader
            title="Trending recipes"
            subtitle="Popular picks to cook right now."
            to="/explore"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                to={`/recipe/${recipe.id}`}
              />
            ))}
          </div>
        </section>

        {/* 4. Community (Firebase) */}
        <section>
          <SectionHeader
            title="From the community"
            subtitle="Recipes shared by Cook Vise members."
            to="/community"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {communityRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                to={`/community/${recipe.id}`}
              />
            ))}
          </div>
        </section>

        {/* 5. Features */}
        <section>
          <SectionHeader title="Why Cook Vise" />
          <div className="grid gap-5 md:grid-cols-3">
            {features.map(({ title, text, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-line bg-white p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-soft/20 text-orange-deep">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-[Fraunces,serif] text-lg font-semibold text-forest">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>
        {user ? (
          <section className="space-y-5">
            <SectionHeader
              title="Your kitchen"
              subtitle="Jump back into what you were doing."
            />

            {/* Quick shortcuts */}
            <div className="grid gap-4 sm:grid-cols-3">
              {shortcuts.map(({ label, text, to, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-forest/40 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-tint text-forest transition group-hover:bg-forest group-hover:text-cream">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-forest">
                      {label}
                    </span>
                    <span className="block truncate text-sm text-muted">
                      {text}
                    </span>
                  </span>
                  <FiArrowRight
                    className="ml-auto shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-forest"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            {/* Share-a-recipe CTA */}
            <div className="relative overflow-hidden rounded-3xl border border-forest/10 bg-forest-tint px-6 py-10 sm:px-10">
              <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-orange-soft/25" />
              <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div className="max-w-lg">
                  <h2 className="font-[Fraunces,serif] text-2xl font-semibold text-forest sm:text-3xl">
                    Got a recipe worth sharing?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Add it to your collection, and share it with the community
                    whenever you're ready.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/my-recipes/new"
                    className="flex items-center gap-2 rounded-lg bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                  >
                    <FiPlus aria-hidden="true" /> Create a recipe
                  </Link>
                  <Link
                    to="/community"
                    className="rounded-lg border border-forest/30 bg-white px-5 py-2.5 text-sm font-medium text-forest transition hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                  >
                    Browse community
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="relative overflow-hidden rounded-3xl bg-forest px-6 py-12 text-center text-cream sm:px-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-orange-soft/20" />
            <div className="relative">
              <h2 className="font-[Fraunces,serif] text-3xl font-semibold">
                Every recipe has a story. What's yours?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-cream/80">
                Create a free account to save recipes, build shopping lists, and
                share your own.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/signup"
                  className="rounded-lg bg-orange-soft px-5 py-2.5 text-sm font-semibold text-forest-dark transition hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  Create free account
                </Link>
                <Link
                  to="/explore"
                  className="rounded-lg border border-cream/40 px-5 py-2.5 text-sm font-medium transition hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  Browse recipes
                </Link>
              </div>
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
