/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { loggerInjectionToken } from "@k-lens/logger";
import { getInjectable } from "@ogre-tools/injectable";

const logErrorInjectable = getInjectable({
  id: "log-error",
  instantiate: (di) => di.inject(loggerInjectionToken).error,
  decorable: false,
});

export default logErrorInjectable;
