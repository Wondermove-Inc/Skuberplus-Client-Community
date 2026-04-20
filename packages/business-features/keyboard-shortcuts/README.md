# @k-lens/keyboard-shortcuts

This Feature enables keyboard shortcuts in Lens

## Usage

```sh
npm install @k-lens/keyboard-shortcuts
```

```typescript
import { keyboardShortcutsFeature } from "@k-lens/keyboard-shortcuts";
import { registerFeature } from "@k-lens/feature-core";
import { createContainer } from "@ogre-tools/injectable";

const di = createContainer("some-container");

registerFeature(di, keyboardShortcutsFeature);
```

## Extendability
