/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { sidebarItemInjectionToken } from "@k-lens/cluster-sidebar";
import { noop } from "@k-lens/utilities";
import { getInjectable } from "@ogre-tools/injectable";

const customResourcesSidebarItemInjectable = getInjectable({
  id: "sidebar-item-custom-resources",
  instantiate: () => ({
    parentId: null,
    title: "Custom Resources",
    onClick: noop,
    orderNumber: 110,
  }),
  injectionToken: sidebarItemInjectionToken,
});

export default customResourcesSidebarItemInjectable;
