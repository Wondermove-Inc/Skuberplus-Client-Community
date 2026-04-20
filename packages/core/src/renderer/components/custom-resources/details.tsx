/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import "./details.scss";

import { CustomResourceDefinition, KubeObject } from "@k-lens/kube-object";
import { loggerInjectionToken } from "@k-lens/logger";
// 🎯 shadcn UI 컴포넌트: DrawerItem 대체
import { DetailPanelField } from "@k-lens/storybook-shadcn/src/components/ui/detail-panel-section";
import { cssNames, safeJSONPathValue } from "@k-lens/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import { startCase } from "lodash/fp";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { BadgeBoolean } from "../badge";
import { Input } from "../input";
import { KubeObjectConditionsDrawer } from "../kube-object-conditions";

import type { AdditionalPrinterColumnsV1 } from "@k-lens/kube-object";
import type { Logger } from "@k-lens/logger";
import type { StrictReactNode } from "@k-lens/utilities";

import type { KubeObjectDetailsProps } from "../kube-object-details";

export interface CustomResourceDetailsProps extends KubeObjectDetailsProps<KubeObject> {
  crd?: CustomResourceDefinition;
}

function convertSpecValue(value: unknown): StrictReactNode {
  if (Array.isArray(value)) {
    return (
      <ul>
        {value.map((value, index) => (
          <li key={index}>{convertSpecValue(value)}</li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    return <Input readOnly multiLine theme="round-black" className="box grow" value={JSON.stringify(value, null, 2)} />;
  }

  if (typeof value === "boolean") {
    return <BadgeBoolean value={value} />;
  }

  if (typeof value === "string" || typeof value === "number") {
    return value.toString();
  }

  return null;
}

interface Dependencies {
  logger: Logger;
}

class NonInjectedCustomResourceDetails extends Component<CustomResourceDetailsProps & Dependencies> {
  // 🎯 shadcn DetailPanelField로 마이그레이션 완료
  renderAdditionalColumns(resource: KubeObject, columns: AdditionalPrinterColumnsV1[]) {
    return columns.map(({ name, jsonPath }) => (
      <DetailPanelField key={name} label={startCase(name)}>
        {convertSpecValue(safeJSONPathValue(resource, jsonPath))}
      </DetailPanelField>
    ));
  }

  render() {
    const {
      props: { object, crd, logger },
    } = this;

    if (!object || !crd) {
      return null;
    }

    if (!(object instanceof KubeObject)) {
      logger.error("[CrdResourceDetails]: passed object that is not an instanceof KubeObject", object);

      return null;
    }

    if (!(crd instanceof CustomResourceDefinition)) {
      logger.error("[CrdResourceDetails]: passed crd that is not an instanceof CustomResourceDefinition", crd);

      return null;
    }

    const extraColumns = crd.getPrinterColumns();

    return (
      <div className={cssNames("CustomResourceDetails", crd.getResourceKind())}>
        {this.renderAdditionalColumns(object, extraColumns)}
        <KubeObjectConditionsDrawer object={object} />
      </div>
    );
  }
}

export const CustomResourceDetails = withInjectables<Dependencies, CustomResourceDetailsProps>(
  observer(NonInjectedCustomResourceDetails),
  {
    getProps: (di, props) => ({
      ...props,
      logger: di.inject(loggerInjectionToken),
    }),
  },
);
