# Drab
Next.js inspired framework with a progressive enhancement architecture.

Proof of concept, pre-alpha, not even worth looking at yet.

This project is an attempt to create something similar to Next.js but that renders in a similar spirit to a progressive enhancement approach.

Next.js ships all JavaScript to the client, whereas this project only ships components that change.

I think Next.js uses clever Webpack work on the server / client. So this would be the next stuff to figure out.

Massively inspired by https://github.com/wildlyinaccurate/second/tree/master/packages/second-dehydrator

Main differences in the hydrator are, the server renderer markup is cleaner:
1. No wrapper elements
2. Props are data attributes

Todo:

- Have a good example of something that falls back to a completely different output, for example accordions should fallback to static content. Next.js allows you to know if you're on the server or not for rendering.
- Remove decision to hydrate, from the user, do we need Webpack to do this, since we can't figure that out at runtime...
- Dev mode only pretty print HTML
- Fix XSS vuln with rehydration
- Figure out if forking Next.js would be easier?
