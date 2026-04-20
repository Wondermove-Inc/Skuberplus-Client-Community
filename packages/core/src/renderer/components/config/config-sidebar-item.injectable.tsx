/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { sidebarItemInjectionToken } from "@k-lens/cluster-sidebar";
import { getInjectable } from "@ogre-tools/injectable";
import { noop } from "lodash/fp";

const configSidebarItemInjectable = getInjectable({
  id: "sidebar-item-config",

  instantiate: () => ({
    parentId: null,
    title: "Config",
    onClick: noop,
    orderNumber: 40,
  }),

  injectionToken: sidebarItemInjectionToken,
});

export default configSidebarItemInjectable;
