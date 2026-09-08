import { getTranslator, getAlternates } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Link from "@/components/localized-link";
import { ArrowRight, Download } from "lucide-react";
import { guides as englishGuides, translateGuides } from "@/lib/guides";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator();
  return {
    alternates: await getAlternates("/guide"),
    title: t("User Guide"),
    description: t(
      "A practical guide to recording, transferring, segmenting, labeling, and exporting motion with WatchMotion Editor.",
    ),
  };
}
export default async function GuideIndex() {
  const t = await getTranslator();
  const guides = translateGuides(t);
  return (
    <div className="container">
      <header className="page-intro">
        <span className="eyebrow">{t("The user guide")}</span>
        <h1>
          {t("One small movement.")}
          <br />
          {t("The whole workflow.")}
        </h1>
        <p>
          {t(
            "Move a small box across a desk. Find each movement in the signal. Turn those moments into a labeled dataset.",
          )}
        </p>
      </header>
      <aside className="guide-callout">
        <div>
          <h2>Everyday Hand Motions</h2>
          <p>
            {t(
              "Follow along in the real Mac app with Desk Object Transfer, our example recording. The project contains illustrative synthetic data, not a real participant’s measurements.",
            )}
          </p>
        </div>
        <a
          className="button button-dark"
          href="/examples/everyday-hand-motions.watchmotion"
          download
        >
          {t("Download example")}
          <Download size={18} />
        </a>
      </aside>
      <div className="chapter-list">
        {guides.map((g, i) => (
          <Link className="chapter-card" href={`/guide/${g.slug}`} key={g.slug}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2>{g.title}</h2>
              <p>{g.description}</p>
            </div>
            <ArrowRight size={22} />
          </Link>
        ))}
      </div>
    </div>
  );
}
