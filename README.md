# Nexa protocol

The wire format of the Nexa gateway. This package is the one definition of the gateway contract: the Nexa server
declares its methods with these types, and the public transport (`nexa-transport`) and its clients call them with
the same types.

- the request, response and event types of every gateway method (sessions, accounts, connectors, environments,
  design, workflows, Roblox preview input, reverse-engineering pages, red-team efforts, pricing), their wire enums
  and their wire limits, organized by domain;
- the method catalog `Method` (`gateway/Method.js`) and the method map `GatewayMethods` with `MethodName`,
  `ParamsOf<M>` and `ResultOf<M>` (`gateway/ProtocolTypes.js`);
- the JSON schema generated from those types (`schema/SchemaData.js`) and the validators that check untrusted JSON
  against it: one per method boundary, event and paged reverse-engineering response (`schema/Validators.js`,
  `schema/MethodValidators.js`), with the dependent connector checks they run (`schema/Connector*Checks.js`);
- the JSON value, the visual response and the graphic shapes, and the validators the transport runs on them;
- the frame codecs the transport runs: the binary envelope, chunked attachment transfer with its credits and
  byte budgets, the JSON frame measurements, bounded connector host JSON and tool-call bridge input;
- the red-team request and response codecs the transport's red-team client runs.

It holds types, wire codecs and wire validation only. Feature logic and server code are not part of this package.

The [RPC reference](docs/methods.md) lists every method with a typed call template, and the
[protocol types](docs/protocol.md) list every payload field with the module that declares it.

## Use

```ts
import { Method } from 'nexa-protocol/gateway/Method.js';
import type { ParamsOf, ResultOf } from 'nexa-protocol/gateway/ProtocolTypes.js';
import { reverseSnapshot } from 'nexa-protocol/schema/Validators.js';
import type { DesignCreateRequest } from 'nexa-protocol/design/DesignRequests.js';
```

Every module under `src/` is exported at the same path with a `.js` extension. The package ships compiled
JavaScript and type declarations in `dist/`, which is committed, so it installs from a GitHub tarball without a
build step:

```json
"nexa-protocol": "https://codeload.github.com/dacely-cloud/nexa-protocol/tar.gz/<commit>"
```

Its one dependency is [nerva-connector-protocol](https://github.com/dacely-cloud/nerva-connector-protocol), pinned
by commit. That package owns every connector type (enrollment, files, execution grants, host tools, inventory,
workspaces); the gateway uses them directly and never declares them again. A connector type with exact integers
takes a parameter, `bigint` on the device side and `string` here, so `ConnectorHostStatus<string>` is the JSON the
gateway carries. Apps that install nexa-protocol must also declare nerva-connector-protocol at the same commit
(npm refuses a URL dependency reached only transitively). Both packages use only ECMAScript and web-platform
globals in the modules the gateway imports, so they run unchanged in browsers and Node.js 22 or newer.

## Develop

```sh
npm ci
npm run generate   # regenerate the schema, validators, method catalog and docs from src/
npm run check      # typecheck, fail if a generated file is stale, rebuild dist/ and fail if it is out of date
```

`script/generate.mjs` reads this package and the declarations of its pinned nerva-connector-protocol. It runs typescript-json-schema over the contract root
`script/Contract.ts`, shapes the result for the runtime validator, and applies `script/hardening.json`: the
patterns, length and item limits, integer types and closed shapes a TypeScript declaration cannot express. A
hardening entry may only add a constraint, and the build fails when an entry names a definition or field that no
longer exists, so a renamed field cannot silently lose its limits. Add a field's limits to the table in the same
change that adds the field.

Change a definition here, run `npm run generate` and `npm run check`, commit `src/`, `dist/` and `docs/`
together, then move every consumer to the new commit in the same change.
