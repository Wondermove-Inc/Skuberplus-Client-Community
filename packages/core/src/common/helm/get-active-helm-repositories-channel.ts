/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { getRequestChannel } from "@k-lens/messaging";

import type { AsyncResult } from "@k-lens/utilities";

import type { HelmRepo } from "./helm-repo";

export const getActiveHelmRepositoriesChannel = getRequestChannel<void, AsyncResult<HelmRepo[]>>(
  "get-helm-active-list-repositories",
);
