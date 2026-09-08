import Link from "@/components/localized-link";
import { getTranslator } from "@/lib/i18n/server";
export default async function NotFound() {
  const t = await getTranslator();
  return (
    <div className="container not-found">
      <span className="eyebrow">404</span>
      <h1>{t("Page not found")}</h1>
      <p>{t("This page does not exist.")}</p>
      <Link className="button button-dark" href="/">
        {t("Back to home")}
      </Link>
    </div>
  );
}
