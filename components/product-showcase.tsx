import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/** The app pixels are a native window capture, never a generated interface. */
export function ProductShowcase() {
  return (
    <section className="product-stage" aria-labelledby="showcase-title">
      <div className="container stage-content">
        <div className="stage-heading">
          <div>
            <span className="eyebrow">The Mac workspace</span>
            <h2 id="showcase-title">
              Find the moments
              <br />
              that matter.
            </h2>
          </div>
          <div>
            <p>
              Review activity. Shape your segments.
              <br />
              Build a dataset with context.
            </p>
            <Link className="text-link light-link" href="/mac-editor">
              Explore the editor <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <figure className="stage-screen">
          <a
            href="/images/mac-editor-dark.png"
            target="_blank"
            rel="noreferrer"
            aria-label="Open the actual Mac editor screenshot at full size"
          >
            <Image
              src="/images/mac-editor-dark.png"
              alt="Actual WatchMotion Editor Mac window: Desk Object Transfer recording, motion charts, and a selected Object Transfer segment in the inspector."
              width={1512}
              height={900}
              sizes="(max-width: 760px) 100vw, 1240px"
              priority
            />
          </a>
          <figcaption>
            Actual Mac app · Everyday Hand Motions · Illustrative sample data{" "}
            <span>View full size ↗</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function AppFigure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="app-figure">
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open full-size screenshot: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={1512}
          height={900}
          sizes="(max-width: 760px) 100vw, 1100px"
        />
      </a>
      <figcaption>
        {caption} <span>View full size ↗</span>
      </figcaption>
    </figure>
  );
}
