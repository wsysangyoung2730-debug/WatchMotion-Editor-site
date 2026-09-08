import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link className="footer-brand" href="/">
              WatchMotion Editor<span className="coral">.</span>
            </Link>
            <p>From a movement to a meaningful dataset.</p>
          </div>
          <div className="footer-links">
            <Link href="/mac-editor">Mac Editor</Link>
            <Link href="/guide">User Guide</Link>
            <Link href="/support">Support</Link>
            <Link href="/privacy">Privacy</Link>
            <a href={`mailto:${site.email}`}>
              Contact <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} WatchMotion Editor · {site.operator}
          </span>
          <span>Made for Apple Watch, iPhone & Mac.</span>
        </div>
      </div>
    </footer>
  );
}
