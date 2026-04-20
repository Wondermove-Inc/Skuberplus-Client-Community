# @k-lens/react-application

## Usage

```sh
npm install @k-lens/react-application
```

```typescript
import { reactApplicationFeature } from "@k-lens/react-application";
import { registerFeature } from "@k-lens/feature-core";
import { createContainer } from "@ogre-tools/injectable";

const di = createContainer("some-container");

registerFeature(di, reactApplicationRootFeature);
```

## Extendability
