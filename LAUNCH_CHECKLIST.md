# AllToolkit launch checklist

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain.
2. Run `npm install`, `npm run lint`, and `npm run build`.
3. Deploy the production build to the final domain.
4. Confirm these public URLs load: `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and `/opengraph-image`.
5. Add the domain to Google Search Console and verify ownership.
6. Add the Search Console verification token to `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy, and submit `https://YOUR-DOMAIN/sitemap.xml`.
7. Test the homepage, search dropdown, contact page, major PDF/image tools, and mobile navigation on a real phone.
8. Update the privacy policy before enabling analytics, ads, accounts, or third-party file processing.

Search engines decide when and whether to index pages. Correct metadata and a submitted sitemap make AllToolkit discoverable, but indexing and rankings are never guaranteed immediately.
