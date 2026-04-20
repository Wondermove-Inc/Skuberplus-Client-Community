/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { AuthorizationV1Api } from "@k-lens/kubernetes-client-node";
import { getInjectable } from "@ogre-tools/injectable";

import type { KubeConfig } from "@k-lens/kubernetes-client-node";

export type CreateAuthorizationApi = (config: KubeConfig) => AuthorizationV1Api;

const createAuthorizationApiInjectable = getInjectable({
  id: "create-authorization-api",
  instantiate: (): CreateAuthorizationApi => (config) => config.makeApiClient(AuthorizationV1Api),
});

export default createAuthorizationApiInjectable;
