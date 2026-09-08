import { getTranslator, getAlternates } from "@/lib/i18n/server";
export async function generateMetadata() {
  return { alternates: await getAlternates("/") };
}
import Link from "@/components/localized-link";
import { ProductShowcase } from "@/components/product-showcase";
import {
  ArrowRight,
  ArrowUpRight,
  Watch,
  Smartphone,
  Monitor,
  MoveHorizontal,
  Tags,
  FolderOutput,
} from "lucide-react";
import { site, storeLinks } from "@/lib/site";

export default async function Home() {
  const t = await getTranslator();
  const stores = storeLinks();
  return (
    <>
      <section className="home-hero">
        <div className="container">
          <div className="hero-topline">
            <span className="eyebrow">
              <span className="status-dot" />
              {t("A motion data workspace")}
            </span>
            <span className="hero-platforms">APPLE WATCH / IPHONE / MAC</span>
          </div>
          <div className="hero-copy">
            <h1>
              {t("Every movement.")}
              <br />
              {t("A story in data.")}
            </h1>
            <div className="hero-side">
              <h2>{t("Capture on Watch. Refine on Mac.")}</h2>
              <p>
                {t(
                  "Turn everyday motion into a dataset you understand. Record on your wrist, review on iPhone, and give each movement context on Mac.",
                )}
              </p>
              <Link className="text-link" href="/guide/getting-started">
                {t("Discover the workflow")}
                <ArrowUpRight size={19} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ProductShowcase />
      <section className="section" id="workflow">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{t("01 / THE WORKFLOW")}</span>
              <h2>
                {t("From your wrist.")}
                <br />
                {t("To your next idea.")}
              </h2>
            </div>
            <p>
              {t(
                "Each device has a job. Together, they take you from a raw recording to a dataset you understand.",
              )}
            </p>
          </div>
          <div className="device-grid">
            {[
              {
                icon: Watch,
                n: "01",
                title: t("Capture on Watch"),
                text: t(
                  "Record acceleration, rotation rate, and attitude as you move. Keep the app open while recording.",
                ),
                os: site.minOS.watch + " " + t("or later"),
              },
              {
                icon: Smartphone,
                n: "02",
                title: t("Review on iPhone"),
                text: t(
                  "Check the recording, inspect its motion charts, add a note, and send it to your Mac.",
                ),
                os: site.minOS.iphone + " " + t("or later"),
              },
              {
                icon: Monitor,
                n: "03",
                title: t("Refine on Mac"),
                text: t(
                  "Find activity ranges, adjust boundaries, apply labels, and export a focused dataset.",
                ),
                os: site.minOS.mac + " " + t("or later"),
              },
            ].map(({ icon: Icon, n, title, text, os }) => (
              <article className="device-card" key={n}>
                <div className="card-top">
                  <Icon size={30} strokeWidth={1.4} />
                  <span>{n}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="device-os">{os}</span>
              </article>
            ))}
          </div>
          <p className="subtle-note">
            {t(
              "The complete workflow requires an Apple Watch paired with an iPhone, plus a Mac. Apps are installed on each device.",
            )}
          </p>
        </div>
      </section>
      <section className="section soft-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{t("02 / MADE FOR THE DETAILS")}</span>
              <h2>
                {t("Less searching.")}
                <br />
                {t("More understanding.")}
              </h2>
            </div>
            <Link className="text-link" href="/mac-editor">
              {t("Take a closer look")}
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="feature-columns">
            {[
              {
                icon: MoveHorizontal,
                title: t("A useful first cut"),
                text: t(
                  "Auto Segments suggests activity ranges. You decide what to keep and where each segment begins and ends.",
                ),
              },
              {
                icon: Tags,
                title: t("Labels that fit your work"),
                text: t(
                  "Create a project label vocabulary, add context with notes, and keep your annotations connected to the recording.",
                ),
              },
              {
                icon: FolderOutput,
                title: t("Ready for the next step"),
                text: t(
                  "Organize labeled segments into folders. Export CSV or Create ML datasets, or save a project to continue later.",
                ),
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon className="coral" size={26} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container guide-banner">
          <div>
            <span className="eyebrow">
              {t("A SMALL MOVEMENT. A COMPLETE WALKTHROUGH.")}
            </span>
            <h2>
              {t("Your first labeled")}
              <br />
              {t("object transfer.")}
            </h2>
            <p>
              {t(
                "Follow a desk-based example, from recording a movement to exporting its labeled samples.",
              )}
            </p>
            <Link className="button button-dark" href="/guide">
              {t("Open the user guide")}
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="example-label">
            <span>{t("EXAMPLE PROJECT")}</span>
            <h3>
              Everyday
              <br />
              Hand Motions
            </h3>
            <div className="label-chip">
              <span /> Object Transfer
            </div>
            <p>{t("Pick up. Move. Set down. Pause.")}</p>
          </div>
        </div>
      </section>
      <section className="download-section" id="download">
        <div className="container download-inner">
          <div>
            <span className="eyebrow">WATCHMOTION EDITOR</span>
            <h2>
              {t("Your next dataset")}
              <br />
              {t("starts with a movement.")}
            </h2>
            <p>{t("For Apple Watch, iPhone, and Mac.")}</p>
          </div>
          <div className="download-actions">
            {stores.iphone || stores.mac ? (
              <>
                {stores.iphone && (
                  <a className="button button-light" href={stores.iphone}>
                    {t("Get iPhone & Watch apps")}
                    <ArrowUpRight size={18} />
                  </a>
                )}
                {stores.mac && (
                  <a className="button button-light" href={stores.mac}>
                    {t("Get the Mac app")}
                    <ArrowUpRight size={18} />
                  </a>
                )}
              </>
            ) : (
              <>
                <span className="coming-soon">
                  <span className="status-dot" />
                  {t("Coming to the App Store")}
                </span>
                <p>
                  {t("We’re preparing the first release.")}
                  <br />
                  {t("Explore the workflow while we get ready.")}
                </p>
                <Link
                  className="text-link light-link"
                  href="/guide/getting-started"
                >
                  {t("Read the setup guide")}
                  <ArrowRight size={18} />
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
