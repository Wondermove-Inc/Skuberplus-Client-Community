/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { sidebarItemInjectionToken } from "@k-lens/cluster-sidebar";
import { getInjectable } from "@ogre-tools/injectable";
import { noop } from "lodash/fp";

const helmSidebarItemInjectable = getInjectable({
  id: "sidebar-item-helm",

  instantiate: () => ({
    parentId: null,
    title: "Helm",
    onClick: noop,
    orderNumber: 90,
  }),

  injectionToken: sidebarItemInjectionToken,
});

export default helmSidebarItemInjectable;
