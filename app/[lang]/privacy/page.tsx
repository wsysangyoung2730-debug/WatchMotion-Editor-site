import { getTranslator, getAlternates } from "@/lib/i18n/server";
import type { Metadata } from "next";
import { site } from "@/lib/site";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator();
  return {
    alternates: await getAlternates("/privacy"),
    title: t("Privacy Policy"),
    description: t(
      "How WatchMotion Editor handles local motion recordings, device transfers, exports, website requests, and support correspondence.",
    ),
  };
}
export default async function Privacy() {
  const t = await getTranslator();
  return (
    <div className="container">
      <article className="prose">
        <header className="page-intro">
          <span className="eyebrow">{t("Privacy")}</span>
          <h1>
            {t("Your motion.")}
            <br />
            {t("Your context.")}
          </h1>
          <p>
            {t(
              "This policy explains how the WatchMotion Editor apps, this website, and support correspondence handle information.",
            )}
          </p>
          <p className="policy-meta">
            {t("Last updated:")} {t(site.policyDate)}
            <br />
            {t("Operator:")} {site.operator} ·{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </header>
        <section>
          <h2>{t("1. Information in the apps")}</h2>
          <p>
            {t(
              "WatchMotion Editor records motion sensor samples on Apple Watch, including acceleration, rotation rate, gravity, orientation, and timestamps. Recordings can include session metadata such as duration and sample count. The apps store recordings and editing information locally on your devices.",
            )}
          </p>
          <p>
            {t(
              "You may choose to add recording names, labels, notes, and participant information. Optional participant fields can include a name or nickname, gender, age group, height, dominant hand, experience level, and a memo. Only enter information you need and have permission to use.",
            )}
          </p>
        </section>
        <section>
          <h2>{t("2. How that information is used")}</h2>
          <p>
            {t(
              "The apps use this information to show motion charts, suggest activity ranges, save your annotations, organize projects, and create exports you request. Auto Segments analysis runs in the Mac app. A WatchMotion Editor account is not required.",
            )}
          </p>
          <p>
            {t(
              "The current apps do not include advertising or a third-party analytics SDK, and they do not upload your recordings to an operator-run cloud service. This does not prevent you from intentionally exporting or sharing a file, or from using operating-system backup services.",
            )}
          </p>
        </section>
        <section>
          <h2>{t("3. Device connections and permissions")}</h2>
          <p>
            {t(
              "The Watch app sends recordings to its paired iPhone using Apple’s device connectivity services. iPhone-to-Mac transfer uses a local peer connection; you approve the iPhone connection on Mac. Permissions such as motion access and local network access support recording and device discovery. You can manage permissions in your device settings, but disabling them can prevent the related feature from working.",
            )}
          </p>
          <p>
            {t(
              "The Watch app must remain open while recording. Leaving it saves and stops recording; it is not designed for continuous background monitoring.",
            )}
          </p>
        </section>
        <section>
          <h2>{t("4. Exports, backups, and deletion")}</h2>
          <p>
            {t(
              "Exported CSV, Create ML data, and project files can include motion samples and the metadata you choose to include. Review your export settings before sharing, especially if notes or participant fields contain personal information. Exports are separate copies outside the app’s control.",
            )}
          </p>
          <p>
            {t(
              "Recordings and annotations remain on your devices until you remove them. Watch transfer files are retained until the iPhone confirms import, or until you delete them. Deleting a local copy does not erase copies on another device, files you have exported, or backups held by another service. Manage those copies separately.",
            )}
          </p>
          <p>
            {t(
              "If you save files to iCloud Drive or another synced folder, that provider’s terms and privacy settings also apply.",
            )}
          </p>
        </section>
        <section>
          <h2>{t("5. Purchases and free trial")}</h2>
          <p>
            {t(
              "The Mac app offers a one-time, non-consumable Full Unlock purchase through Apple’s StoreKit. Apple processes the transaction and provides the app with signed purchase and entitlement information, including product, transaction, purchase, revocation, and verification status. We do not receive your full payment card details.",
            )}
          </p>
          <p>
            {t(
              "To enforce the free trial, the Mac app stores a device-local trial record in the macOS Keychain. It contains a workspace identifier, identifiers for recordings admitted for editing, and the number of completed dataset exports. This record does not contain motion samples, labels, notes, participant information, or payment card details, and it is not uploaded to an operator-run server.",
            )}
          </p>
          <p>
            {t(
              "The Keychain trial record may remain after you delete recordings or the app so that deleting content does not reset the trial. You can delete it by removing the WatchMotion Editor trial entry from macOS Keychain Access or by erasing the device. A verified purchase entitlement replaces trial limits; refunds or revocations can remove that entitlement. Use Restore Purchases in the Mac app to ask Apple to restore an eligible purchase.",
            )}
          </p>
        </section>
        <section>
          <h2>{t("6. This website")}</h2>
          <p>
            {t(
              "Language preference is stored in a first-party cookie for one year when you choose a language. It is used only to remember that choice, not for analytics or advertising.",
            )}
          </p>
          <p>
            {t(
              "You can read this website without creating an account. We have not added advertising trackers, analytics scripts, or a contact form. Fonts and website images are served as site assets; there are no embedded third-party videos.",
            )}
          </p>
          <p>
            {t(
              "When hosted on Vercel, requests are processed by Vercel to deliver and protect the site. Technical information such as IP address, request path, browser information, and request time may be processed in hosting and security systems. This is separate from the motion recordings stored by the apps. See",
            )}{" "}
            <a href="https://vercel.com/legal/privacy-policy">
              {t("Vercel’s Privacy Policy")}
            </a>{" "}
            {t("for its handling of personal information.")}
          </p>
        </section>
        <section>
          <h2>{t("7. When you contact support")}</h2>
          <p>
            {t(
              "If you email support, we receive your email address and the information you choose to send, including message text and any attachments. We use it to respond, investigate issues, and maintain relevant support records. Correspondence is handled through our email provider; do not send recordings or sensitive participant information unless necessary and agreed in advance.",
            )}
          </p>
          <p>
            {t(
              "Support information is kept while needed to resolve and follow up on the request, subject to applicable recordkeeping requirements. Contact us to request access, correction, or deletion of support information. We cannot remotely access or delete recordings stored only on your devices.",
            )}
          </p>
        </section>
        <section>
          <h2>{t("8. Your choices and other people’s information")}</h2>
          <p>
            {t(
              "You control whether to record, add optional context, transfer files, or export data. If you record or describe another person, obtain any permission required for your situation. Take particular care with children’s information and avoid including unnecessary identifying details.",
            )}
          </p>
          <p>
            {t(
              "Depending on where you live, you may have rights regarding personal information we hold, including access, correction, and deletion. Contact us below to make a request or raise a privacy concern.",
            )}
          </p>
        </section>
        <section>
          <h2>{t("9. Updates and contact")}</h2>
          <p>
            {t(
              "We may update this policy when the apps, website, or information-handling practices change. The date at the top identifies the latest update.",
            )}
          </p>
          <p>
            {t("For privacy questions, contact")} {site.operator} {t("at")}{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </section>
      </article>
    </div>
  );
}
