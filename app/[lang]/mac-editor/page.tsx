import { getTranslator, getAlternates } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Link from "@/components/localized-link";
import { ArrowRight } from "lucide-react";
import { AppFigure } from "@/components/product-showcase";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator();
  return {
    alternates: await getAlternates("/mac-editor"),
    title: t("The Mac Editor"),
    description: t(
      "Explore actual WatchMotion Editor screens: review motion charts, confirm Auto Segments, customize labels, and export datasets.",
    ),
  };
}
export default async function MacEditor() {
  const t = await getTranslator();
  return (
    <div className="container">
      <header className="page-intro">
        <span className="eyebrow">{t("Built for a closer look")}</span>
        <h1>
          {t("Raw motion.")}
          <br />
          {t("Clear decisions.")}
        </h1>
        <p>
          {t(
            "A dedicated Mac workspace for the part that needs your judgment: what happened, where it happened, and what to call it.",
          )}
        </p>
        <Link className="button button-dark" href="/guide/review-and-segment">
          {t("Learn the editing workflow")}
          <ArrowRight size={18} />
        </Link>
      </header>
      <AppFigure
        src="/images/mac-editor-dark.png"
        alt={t(
          "Actual Mac editor with three activity bursts and the Object Transfer inspector",
        )}
        caption={t(
          "Actual Mac app · Desk Object Transfer · Illustrative sample data",
        )}
      />
      <section className="feature-story">
        <div className="story-heading">
          <div>
            <span className="eyebrow">{t("01 / Understand the signal")}</span>
            <h2>
              {t("See the movement.")}
              <br />
              {t("Keep the context.")}
            </h2>
          </div>
          <div>
            <p>
              {t(
                "Read acceleration, rotation rate, and attitude side by side in the same recording. Select a range, focus on its detail, then return to the full timeline.",
              )}
            </p>
            <Link className="text-link" href="/guide/review-and-segment">
              {t("Read the charts")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="feature-story">
        <div className="story-heading">
          <div>
            <span className="eyebrow">
              {t("02 / A first cut, not a final answer")}
            </span>
            <h2>
              {t("Let activity guide")}
              <br />
              {t("your attention.")}
            </h2>
          </div>
          <div>
            <p>
              {t(
                "Auto Segments suggests active ranges. Review the dashed boundaries, refine them, and confirm only the segments that belong in your work. Suggestions do not automatically recognize or label actions.",
              )}
            </p>
            <Link
              className="text-link"
              href="/guide/review-and-segment#suggestions"
            >
              {t("How suggestions work")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <AppFigure
          src="/images/mac-segments.png"
          alt={t("Actual Mac Auto Segments suggestion awaiting confirmation")}
          caption={t(
            "Actual Mac app · A suggestion is reviewed before it becomes a saved snap.",
          )}
        />
      </section>
      <section className="feature-story">
        <div className="story-heading">
          <div>
            <span className="eyebrow">
              {t("03 / Make the vocabulary yours")}
            </span>
            <h2>
              {t("Your labels.")}
              <br />
              {t("Your way of working.")}
            </h2>
          </div>
          <div>
            <p>
              {t(
                "Customize project labels and colors. Add concise notes, organize labeled snaps into folders, and switch between Light, Dark, and System appearance without changing your workflow.",
              )}
            </p>
            <Link className="text-link" href="/guide/label-and-organize">
              {t("Label and organize")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <AppFigure
          src="/images/mac-editor-light.png"
          alt={t(
            "Actual Mac editor in Light appearance with a labeled motion range",
          )}
          caption={t(
            "Actual Mac app · Light appearance · Illustrative sample data",
          )}
        />
      </section>
      <section className="feature-story">
        <div className="story-heading">
          <div>
            <span className="eyebrow">{t("04 / Keep the next step open")}</span>
            <h2>
              {t("A dataset to use.")}
              <br />
              {t("A project to revisit.")}
            </h2>
          </div>
          <div>
            <p>
              {t(
                "Export reviewed folder contents as CSV or Create ML data. Save a .watchmotion project when you want to preserve your workspace for further editing.",
              )}
            </p>
            <Link className="text-link" href="/guide/export-and-save">
              {t("Choose an export")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
