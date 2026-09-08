import { getTranslator } from "@/lib/i18n/server";
import Image from "next/image";
import Link from "@/components/localized-link";
import { ArrowUpRight } from "lucide-react";

/** The app pixels are a native window capture, never a generated interface. */
export async function ProductShowcase() {
  const t = await getTranslator();
  return (
    <section className="product-stage" aria-labelledby="showcase-title">
      <div className="container stage-content">
        <div className="stage-heading">
          <div>
            <span className="eyebrow">{t("The Mac workspace")}</span>
            <h2 id="showcase-title">
              {t("Find the moments")}
              <br />
              {t("that matter.")}
            </h2>
          </div>
          <div>
            <p>
              {t("Review activity. Shape your segments.")}
              <br />
              {t("Build a dataset with context.")}
            </p>
            <Link className="text-link light-link" href="/mac-editor">
              {t("Explore the editor")}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <figure className="stage-screen">
          <a
            href="/images/mac-editor-dark.png"
            target="_blank"
            rel="noreferrer"
            aria-label={t("Open the actual Mac editor screenshot at full size")}
          >
            <Image
              src="/images/mac-editor-dark.png"
              alt={t(
                "Actual WatchMotion Editor Mac window: Desk Object Transfer recording, motion charts, and a selected Object Transfer segment in the inspector.",
              )}
              width={1512}
              height={900}
              sizes="(max-width: 760px) 100vw, 1240px"
              priority
            />
          </a>
          <figcaption>
            {t(
              "Actual Mac app · Everyday Hand Motions · Illustrative sample data",
            )}{" "}
            <span>{t("View full size ↗")}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export async function AppFigure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  const t = await getTranslator();
  return (
    <figure className="app-figure">
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        aria-label={`${t("Open full-size screenshot:")} ${t(alt)}`}
      >
        <Image
          src={src}
          alt={t(alt)}
          width={1512}
          height={900}
          sizes="(max-width: 760px) 100vw, 1100px"
        />
      </a>
      <figcaption>
        {t(caption)} <span>{t("View full size ↗")}</span>
      </figcaption>
    </figure>
  );
}
