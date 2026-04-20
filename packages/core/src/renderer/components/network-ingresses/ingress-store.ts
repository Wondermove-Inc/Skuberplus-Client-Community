/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { KubeObjectStore } from "../../../common/k8s-api/kube-object.store";

import type { IngressApi } from "@k-lens/kube-api";
import type { Ingress } from "@k-lens/kube-object";

export class IngressStore extends KubeObjectStore<Ingress, IngressApi> {}
