import { getTranslator, getAlternates } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Link from "@/components/localized-link";
import { notFound } from "next/navigation";
import { guides as englishGuides, translateGuides } from "@/lib/guides";
import { AppFigure } from "@/components/product-showcase";
export function generateStaticParams() {
  return englishGuides.map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const t = await getTranslator();
  const guides = translateGuides(t);
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  return {
    alternates: guide ? await getAlternates(`/guide/${guide.slug}`) : undefined,
    title: guide?.title ?? t("Page not found"),
    description: guide?.description,
  };
}
export default async function GuideArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const t = await getTranslator();
  const guides = translateGuides(t);
  const { slug } = await params;
  const index = guides.findIndex((g) => g.slug === slug);
  if (index < 0) notFound();
  const guide = guides[index];
  return (
    <div className="container docs-layout">
      <nav className="docs-nav" aria-label={t("Guide chapters")}>
        <span className="eyebrow">{t("The user guide")}</span>
        <Link href="/guide">{t("Overview & example")}</Link>
        {guides.map((g, i) => (
          <Link
            key={g.slug}
            href={`/guide/${g.slug}`}
            aria-current={g.slug === slug ? "page" : undefined}
          >
            {i + 1}. {g.title}
          </Link>
        ))}
      </nav>
      <article className="docs-article">
        <span className="eyebrow">
          {t("Chapter")} {String(index + 1).padStart(2, "0")} /{" "}
          {String(guides.length).padStart(2, "0")}
        </span>
        <h1>{guide.title}</h1>
        <p className="article-lead">{guide.description}</p>
        {guide.sections.map((s) => (
          <section className="docs-section" id={s.id} key={s.id}>
            <h2>{s.title}</h2>
            {s.paragraphs?.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {s.steps && (
              <ol>
                {s.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            )}
            {s.note && <aside className="note">{s.note}</aside>}
            {s.image && <AppFigure {...s.image} />}
          </section>
        ))}
        <nav
          className="article-pagination"
          aria-label={t("Previous and next chapters")}
        >
          <Link
            href={index > 0 ? `/guide/${guides[index - 1].slug}` : "/guide"}
          >
            <span>{t("← Previous")}</span>
            {index > 0 ? guides[index - 1].title : t("Guide overview")}
          </Link>
          {index < guides.length - 1 ? (
            <Link href={`/guide/${guides[index + 1].slug}`}>
              <span>{t("Next →")}</span>
              {guides[index + 1].title}
            </Link>
          ) : (
            <Link href="/support">
              <span>{t("Need a hand? →")}</span>
              {t("Visit Support")}
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
