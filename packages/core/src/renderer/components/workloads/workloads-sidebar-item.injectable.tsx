/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { sidebarItemInjectionToken } from "@k-lens/cluster-sidebar";
import { getInjectable } from "@ogre-tools/injectable";
import { noop } from "lodash/fp";

const workloadsSidebarItemInjectable = getInjectable({
  id: "sidebar-item-workloads",

  instantiate: () => ({
    parentId: null,
    title: "Workloads",
    onClick: noop,
    orderNumber: 20,
  }),

  injectionToken: sidebarItemInjectionToken,
});

export default workloadsSidebarItemInjectable;
