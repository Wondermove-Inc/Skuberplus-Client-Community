/**
 * Internal helper to avoid importing the entire `@k-lens/test-utils` bundle,
 * which pulls in React Testing Library side-effects during main-process unit tests.
 */

export { getGlobalOverride } from "@k-lens/test-utils/src/get-global-override";

export type { GlobalOverride } from "@k-lens/test-utils/src/get-global-override";
