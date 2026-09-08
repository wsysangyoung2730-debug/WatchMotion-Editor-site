import { getTranslator, getAlternates } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Link from "@/components/localized-link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator();
  return {
    alternates: await getAlternates("/support"),
    title: t("Support"),
    description: t(
      "Get help with WatchMotion Editor setup, recording transfers, Auto Segments, project files, and exports.",
    ),
  };
}
export default async function Support() {
  const t = await getTranslator();
  const faqs = [
    [
      t("Do I need all three devices?"),
      t(
        "Yes, for the complete capture-to-dataset workflow: Apple Watch records, the paired iPhone reviews and transfers, and Mac handles detailed editing and export. You can explore an existing project on Mac without connecting the other devices.",
      ),
    ],
    [
      t("Why did my Watch recording stop?"),
      t(
        "The Watch app must remain open while recording. Leaving it saves and stops the recording. This release does not offer continuous background tracking. Check Saved Files on Watch and the recording list on iPhone before starting again.",
      ),
    ],
    [
      t("A recording has not reached my iPhone. What should I do?"),
      t(
        "Keep the paired Watch and iPhone nearby and open their apps. Check Saved Files on Watch and use Resend if necessary. Delivery may be queued. Do not delete your only copy while transfer is pending.",
      ),
    ],
    [
      t("Why can’t my iPhone find my Mac?"),
      t(
        "Choose Start Receiving in the Mac app. Enable Wi-Fi and Bluetooth, allow local network access, and keep both apps open. Connect from iPhone Connection Settings and approve the iPhone on Mac. A VPN or restricted network can interfere; try a trusted local network if needed.",
      ),
    ],
    [
      t("Why were my older recordings not sent automatically?"),
      t(
        "Automatic Transfer sends new Watch recordings while connected. Existing recordings are not sent automatically; send the recordings you want to move from iPhone.",
      ),
    ],
    [
      t("Does Auto Segments detect each repetition?"),
      t(
        "It suggests activity ranges, not semantic actions or guaranteed repetitions. Clear quiet gaps may separate movements; subtle or continuous movement can be missed, split, or merged. Review the charts, adjust the boundaries, and confirm useful suggestions before labeling.",
      ),
    ],
    [
      t("Why can’t I add a suggested segment to a folder?"),
      t(
        "Confirm the suggestion first, then choose a label for the saved snap. Unconfirmed suggestions and unlabeled snaps are not ready to add to an export folder.",
      ),
    ],
    [
      t("Which file should I keep as a backup?"),
      t(
        "Export a .watchmotion project to retain an editable copy of your work. CSV and Create ML outputs serve analysis and training workflows; they do not replace a full project backup. Export again after important changes.",
      ),
    ],
    [
      t("Where can I change labels or replay the tutorial?"),
      t(
        "Use the workspace toolbar’s Settings → Project Labels to customize that project. Open the Mac app’s Settings for appearance and export defaults. Show Tutorial is available in Mac Settings and iPhone Connection Settings.",
      ),
    ],
  ];

  const subject = encodeURIComponent(t("WatchMotion Editor support"));
  const body = encodeURIComponent(
    t(
      "App version:\nDevice and OS version:\nWhat I expected:\nWhat happened:\nSteps to reproduce:\n\nPlease omit sensitive participant data and private recordings.\n",
    ),
  );
  return (
    <div className="container">
      <header className="page-intro">
        <span className="eyebrow">{t("Support")}</span>
        <h1>
          {t("Keep your workflow")}
          <br />
          {t("moving.")}
        </h1>
        <p>
          {t(
            "Start with the checks below. If you are still stuck, tell us what happened and which device you were using.",
          )}
        </p>
      </header>
      <div className="support-grid">
        <section className="contact-panel">
          <h2>{t("Let’s work it out.")}</h2>
          <p>
            {t(
              "Include your app version, device, OS version, and the steps that led to the issue. Screenshots can help—remove private details first.",
            )}
          </p>
          <a
            className="button button-light"
            href={`mailto:${site.email}?subject=${subject}&body=${body}`}
          >
            {site.email} <ArrowUpRight size={17} />
          </a>
          <small>
            {t("Opens your email app. No message is sent until you send it.")}
            <br />
            {t("Support contact:")} {site.operator}
          </small>
        </section>
        <section className="requirements">
          <h2>{t("Before you start")}</h2>
          <dl>
            <div>
              <dt>iPhone</dt>
              <dd>{site.minOS.iphone}+</dd>
            </div>
            <div>
              <dt>Apple Watch</dt>
              <dd>{site.minOS.watch}+</dd>
            </div>
            <div>
              <dt>Mac</dt>
              <dd>{site.minOS.mac}+</dd>
            </div>
          </dl>
          <p>
            {t(
              "Use an Apple Watch paired with your iPhone. The complete workflow needs all three devices.",
            )}
          </p>
          <p>
            <Link className="text-link" href="/guide/getting-started">
              {t("Open the setup guide →")}
            </Link>
          </p>
        </section>
      </div>
      <section className="faq">
        <h2>{t("Common questions")}</h2>
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
