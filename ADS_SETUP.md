# AllToolkit advertising setup

The site is ad-ready but ads are disabled by default. No empty placeholders appear until the required environment variables are configured.

## Planned placements

- Homepage: below the hero
- Homepage: between content sections
- Homepage: above the final brand section/footer area
- Every tool page: below the tool heading/description
- Every tool page: below the tool interface and supporting content

The reusable component is `components/ads/AdSlot.tsx`. It uses responsive AdSense units and reserves height only when ads are enabled, helping reduce layout shift.

## Enable after AdSense approval

Create responsive display ad units in Google AdSense, then add these values in Vercel:

```env
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_HOME_TOP_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_HOME_MIDDLE_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_HOME_BOTTOM_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_TOOL_TOP_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_TOOL_BOTTOM_SLOT=1234567890
```

Redeploy after saving the variables. Do not click your own ads and do not place ads too close to interactive tool buttons.
