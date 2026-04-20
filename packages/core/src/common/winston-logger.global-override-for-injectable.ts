/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { winstonLoggerInjectable } from "@k-lens/logger";
import { noop } from "@k-lens/utilities";
import { getGlobalOverride } from "../test-utils/get-global-override";

import type winston from "winston";

export default getGlobalOverride(
  winstonLoggerInjectable,
  () =>
    ({
      log: noop,
      add: noop,
      remove: noop,
      clear: noop,
      close: noop,

      warn: noop,
      debug: noop,
      error: noop,
      info: noop,
      silly: noop,
    }) as winston.Logger,
);
