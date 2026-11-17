# Nexa protocol

The wire format of the Nexa gateway, as the public transport (`nexa-transport`) and its clients use it:

- the request, response and event types of the gateway methods (sessions, connections, design, workflows,
  Roblox preview input, reverse-engineering pages, red-team efforts, pricing), their wire enums and their
  wire limits;
- the JSON value, the visual response and the graphic shapes, and the validators the transport runs on them;
- the frame codecs the transport runs: the binary envelope, chunked attachment transfer with its credits and
  byte budgets, the JSON frame measurements, bounded connector host JSON and tool-call bridge input;
- the red-team request and response codecs the transport's red-team client runs.

It holds types and wire codecs only. Feature logic and server code are not part of this package.

## Use

```ts
import { GatewayVersion } from 'nexa-protocol/gateway/GatewayVersion.js';
import type { DesignCreateRequest } from 'nexa-protocol/design/DesignRequests.js';
```

Every module under `src/` is exported at the same path with a `.js` extension. The package ships compiled
JavaScript and type declarations in `dist/`, which is committed, so it installs from a GitHub tarball without a
build step:

```json
"nexa-protocol": "https://codeload.github.com/dacely-cloud/nexa-protocol/tar.gz/<commit>"
```

The package has no runtime dependencies. Its modules use only ECMAScript and web-platform globals, so they run
unchanged in browsers and Node.js 22 or newer.

## Develop

```sh
npm ci
npm run check   # typecheck, rebuild dist/ and fail if the committed dist/ is out of date
```

Change a definition here, run `npm run check`, commit `src/` and `dist/` together, then move every consumer
to the new commit in the same change.
