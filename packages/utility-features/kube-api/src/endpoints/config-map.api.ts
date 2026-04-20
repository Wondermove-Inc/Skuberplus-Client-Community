/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { ConfigMap } from "@k-lens/kube-object";
import { KubeApi } from "../kube-api";

import type { ConfigMapData } from "@k-lens/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class ConfigMapApi extends KubeApi<ConfigMap, ConfigMapData> {
  constructor(deps: KubeApiDependencies, opts?: DerivedKubeApiOptions) {
    super(deps, {
      objectConstructor: ConfigMap,
      ...(opts ?? {}),
    });
  }
}
