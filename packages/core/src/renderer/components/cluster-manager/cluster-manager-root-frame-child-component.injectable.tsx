/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { ErrorBoundary } from "@k-lens/error-boundary";
import { rootFrameChildComponentInjectionToken } from "@k-lens/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import React from "react";
import { ClusterManager } from "./cluster-manager";

const clusterManagerRootFrameChildComponentInjectable = getInjectable({
  id: "cluster-manager-root-frame-child-component",

  instantiate: () => ({
    id: "cluster-manager",

    shouldRender: computed(() => true),

    Component: () => (
      <ErrorBoundary>
        <ClusterManager />
      </ErrorBoundary>
    ),
  }),

  injectionToken: rootFrameChildComponentInjectionToken,
});

export default clusterManagerRootFrameChildComponentInjectable;
