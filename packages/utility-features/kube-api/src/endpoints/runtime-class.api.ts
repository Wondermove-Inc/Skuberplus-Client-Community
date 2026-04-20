/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { RuntimeClass } from "@k-lens/kube-object";
import { KubeApi } from "../kube-api";

import type { RuntimeClassData } from "@k-lens/kube-object";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "../kube-api";

export class RuntimeClassApi extends KubeApi<RuntimeClass, RuntimeClassData> {
  constructor(deps: KubeApiDependencies, opts: DerivedKubeApiOptions = {}) {
    super(deps, {
      objectConstructor: RuntimeClass,
      ...opts,
    });
  }
}
