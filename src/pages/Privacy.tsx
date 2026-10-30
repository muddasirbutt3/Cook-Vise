import LegalLayout from "../components/LegalLayout";
import type { LegalSection } from "../components/LegalLayout";

const list = "list-disc space-y-1.5 pl-5";
const link = "font-medium text-orange-deep hover:underline";

// TODO: replace with your real contact email
const CONTACT_EMAIL = "your-email@example.com";

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: (
      <p>
        This policy explains what information Cook Vise collects, how it is
        used, and the choices you have. We only collect what we need to run the
        app.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <ul className={list}>
          <li>
            <strong className="font-medium">Account details:</strong> your name
            and email address. If you sign in with Google, we also receive your
            Google profile name and photo.
          </li>
          <li>
            <strong className="font-medium">Content you create:</strong>{" "}
            recipes, photos, favorites, and shopping lists.
          </li>
          <li>
            <strong className="font-medium">Basic technical data:</strong>{" "}
            things like browser type and error logs, collected by our hosting
            and authentication providers.
          </li>
        </ul>
        <p>
          Passwords are handled by our authentication provider. We never see or
          store your password in plain text.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <ul className={list}>
        <li>To create your account and keep you signed in.</li>
        <li>To save and show your favorites, recipes, and shopping lists.</li>
        <li>To display recipes you choose to share with the community.</li>
        <li>To keep the app secure and fix problems.</li>
      </ul>
    ),
  },
  {
    id: "services",
    title: "Services we use",
    body: (
      <>
        <p>
          Cook Vise relies on Google Firebase for sign-in, database, and file
          storage. Your account and content are stored with Firebase, which has
          its own privacy practices.
        </p>
        <p>
          Recipe search on the Explore page uses an external recipe provider.
          Your search terms are sent to that provider to return results, and the
          provider can see technical details such as your IP address.
        </p>
      </>
    ),
  },
  {
    id: "public-content",
    title: "Public content",
    body: (
      <p>
        Recipes you share with the community are visible to everyone who uses
        Cook Vise, along with the display name attached to them. Recipes you
        keep private are only visible to you. Please do not put personal
        information in public recipes.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    body: (
      <p>
        We use cookies and browser storage only for essentials, such as keeping
        you signed in and remembering basic settings. We do not use them to show
        ads.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep data",
    body: (
      <p>
        We keep your information while your account is active. If you ask us to
        delete your account, we will remove your personal data and your recipes,
        except where we must keep something for legal reasons.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your choices",
    body: (
      <>
        <p>You can ask us at any time to:</p>
        <ul className={list}>
          <li>Show you the data we hold about you.</li>
          <li>Correct information that is wrong.</li>
          <li>Delete your account and content.</li>
        </ul>
        <p>
          You can also edit or delete your own recipes and favorites directly in
          the app.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We use reasonable measures to protect your data, including secure
        sign-in through Firebase. No online service is perfectly secure, so we
        cannot guarantee absolute protection.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        Cook Vise is not meant for children under 13, and we do not knowingly
        collect their information. If you believe a child has created an
        account, please contact us and we will remove it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. When we do, we will change
        the date at the top of this page.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions or requests about your data? Email us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="October 30, 2026"
      intro="What Cook Vise collects, why we collect it, and the control you have over it."
      sections={sections}
    />
  );
}
