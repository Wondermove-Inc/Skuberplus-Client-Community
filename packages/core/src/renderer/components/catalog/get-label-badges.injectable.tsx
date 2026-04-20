/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { KubeObject } from "@k-lens/kube-object";
// 🎯 shadcn UI 컴포넌트: 레거시 Badge 대체
import { Badge } from "@k-lens/storybook-shadcn/src/components/ui/badge";
import { getInjectable } from "@ogre-tools/injectable";
import React from "react";
import searchUrlPageParamInjectable from "../input/search-url-page-param.injectable";
import styles from "./catalog.module.scss";

import type { CatalogEntity } from "../../api/catalog-entity";

export type GetLabelBadges = (
  entity: CatalogEntity,
  onClick?: (evt: React.MouseEvent<any, MouseEvent>) => void,
) => JSX.Element[];

const getLabelBadgesInjectable = getInjectable({
  id: "get-label-badges",
  instantiate: (di): GetLabelBadges => {
    const searchUrlParam = di.inject(searchUrlPageParamInjectable);

    return (entity, onClick) =>
      KubeObject.stringifyLabels(entity.metadata.labels).map((label) => (
        <Badge
          variant="outline"
          className={styles.badge}
          key={label}
          title={label}
          onClick={(event) => {
            searchUrlParam.set(label);
            onClick?.(event);
            event.stopPropagation();
          }}
        >
          {label}
        </Badge>
      ));
  },
});

export default getLabelBadgesInjectable;
