import Link from "next/link";
export default function NotFound(){return <div className="container not-found"><span className="eyebrow">404 / Page not found</span><h1>A little off track.</h1><p>This page is not available. The guide is a good place to pick up again.</p><Link className="button button-dark" href="/guide">Open the user guide →</Link></div>;}
