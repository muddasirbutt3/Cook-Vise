import LegalLayout from "../components/LegalLayout";
import type { LegalSection } from "../components/LegalLayout";

const list = "list-disc space-y-1.5 pl-5";
const link = "font-medium text-orange-deep hover:underline";

// TODO: replace with your real contact email
const CONTACT_EMAIL = "your-email@example.com";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    body: (
      <p>
        By creating an account or using Cook Vise, you agree to these Terms &
        Conditions. If you do not agree, please do not use the app.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "Your account",
    body: (
      <>
        <p>
          You can sign up with an email and password or with Google. You are
          responsible for keeping your login details safe and for everything
          that happens under your account.
        </p>
        <p>
          Please provide accurate information, and let us know if you think
          someone else has accessed your account.
        </p>
      </>
    ),
  },
  {
    id: "your-content",
    title: "Your content",
    body: (
      <>
        <p>
          You can create recipes, upload photos, and save favorites and shopping
          lists. You keep ownership of the content you create.
        </p>
        <p>
          When you mark a recipe as public or share it with the community, you
          give Cook Vise permission to display it to other users inside the app.
          Recipes you keep private are only visible to you.
        </p>
        <p>
          You confirm that you have the right to post what you upload. Please do
          not copy recipes, text, or photos from other people or websites
          without permission.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>When using Cook Vise, you agree not to:</p>
        <ul className={list}>
          <li>
            Post content that is illegal, hateful, harassing, or misleading.
          </li>
          <li>Upload content that infringes someone else’s rights.</li>
          <li>Spam the community or post unrelated advertising.</li>
          <li>
            Try to break, overload, or gain unauthorized access to the app or
            its data.
          </li>
          <li>Use automated tools to scrape the app without permission.</li>
        </ul>
        <p>
          We may remove content or restrict accounts that break these rules.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Recipe data from third parties",
    body: (
      <p>
        Some recipes on the Explore page come from an external recipe provider.
        That content belongs to its respective owners, is provided as is, and
        may contain mistakes or be incomplete. We do not control or guarantee
        the accuracy of third-party recipe data.
      </p>
    ),
  },
  {
    id: "food-safety",
    title: "Food safety and allergies",
    body: (
      <>
        <p>
          Recipes, cooking times, and nutrition details are for general
          information only. Always check ingredients for allergens, cook food to
          safe temperatures, and use your own judgment in the kitchen.
        </p>
        <p>
          If you have an allergy or a medical dietary requirement, verify every
          ingredient yourself. Cook Vise is not responsible for reactions or
          illness caused by a recipe.
        </p>
      </>
    ),
  },
  {
    id: "availability",
    title: "Availability and changes",
    body: (
      <p>
        We try to keep Cook Vise running smoothly, but we cannot promise it will
        always be available or error free. Features may change, move, or be
        removed at any time.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Ending your account",
    body: (
      <p>
        You can stop using Cook Vise at any time and ask us to delete your
        account. We may suspend or close accounts that break these terms or put
        other users or the service at risk.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Disclaimer and limits of liability",
    body: (
      <p>
        Cook Vise is provided as is, without warranties of any kind. To the
        fullest extent allowed by law, we are not liable for any indirect or
        consequential damages, or for loss of data or content, arising from your
        use of the app.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. When we do, we will change
        the date at the top of this page. Continuing to use Cook Vise after an
        update means you accept the new terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about these terms? Email us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      updated="October 30, 2026"
      intro="The simple rules for using Cook Vise. Please read them before you create an account."
      sections={sections}
    />
  );
}
