/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { KubeObjectStore } from "../../../../common/k8s-api/kube-object.store";

import type { ClusterRoleApi } from "@k-lens/kube-api";
import type { ClusterRole, ClusterRoleData } from "@k-lens/kube-object";

export class ClusterRoleStore extends KubeObjectStore<ClusterRole, ClusterRoleApi, ClusterRoleData> {
  protected sortItems(items: ClusterRole[]) {
    return super.sortItems(items, [(clusterRole) => clusterRole.kind, (clusterRole) => clusterRole.getName()]);
  }
}
