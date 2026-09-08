import { getTranslator } from "@/lib/i18n/server";
import Link from "@/components/localized-link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
export async function Footer() {
  const t = await getTranslator();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link className="footer-brand" href="/">
              WatchMotion Editor<span className="coral">.</span>
            </Link>
            <p>{t("From a movement to a meaningful dataset.")}</p>
          </div>
          <div className="footer-links">
            <Link href="/mac-editor">{t("Mac Editor")}</Link>
            <Link href="/guide">{t("User Guide")}</Link>
            <Link href="/support">{t("Support")}</Link>
            <Link href="/privacy">{t("Privacy")}</Link>
            <a href={`mailto:${site.email}`}>
              {t("Contact")}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} WatchMotion Editor · {site.operator}
          </span>
          <span>{t("Made for Apple Watch, iPhone & Mac.")}</span>
        </div>
      </div>
    </footer>
  );
}
