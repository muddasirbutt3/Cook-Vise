import { Link } from "react-router-dom";
import { FiClock, FiUsers, FiHeart, FiImage } from "react-icons/fi";

export type RecipeCardData = {
  id: string;
  title: string;
  image?: string;
  time?: number; // minutes
  servings?: number;
  author?: string; // community recipes only
};

type RecipeCardProps = {
  recipe: RecipeCardData;
  to: string; // where the card links to
};

export default function RecipeCard({ recipe, to }: RecipeCardProps) {
  const handleFavorite = () => {
    // TODO: add or remove this recipe from the user's favorites
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-line bg-white transition hover:shadow-md">
      <Link to={to} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-forest-tint">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-forest/40">
              <FiImage size={32} aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 font-[Fraunces,serif] text-lg font-semibold leading-snug text-forest">
            {recipe.title}
          </h3>

          <div className="mt-2 flex items-center gap-4 text-sm text-muted">
            {recipe.time && (
              <span className="flex items-center gap-1.5">
                <FiClock aria-hidden="true" /> {recipe.time} min
              </span>
            )}
            {recipe.servings && (
              <span className="flex items-center gap-1.5">
                <FiUsers aria-hidden="true" /> {recipe.servings}
              </span>
            )}
          </div>

          {recipe.author && (
            <p className="mt-2 truncate text-xs text-muted">
              by{" "}
              <span className="font-medium text-charcoal">{recipe.author}</span>
            </p>
          )}
        </div>
      </Link>

      {/* Favorite button sits on top of the image */}
      <button
        type="button"
        onClick={handleFavorite}
        aria-label={`Save ${recipe.title} to favorites`}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-sm transition hover:text-danger focus-visible:outline-2 focus-visible:outline-forest"
      >
        <FiHeart size={18} />
      </button>
    </article>
  );
}
