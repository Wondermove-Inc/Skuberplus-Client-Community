/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { roleApiInjectable } from "@k-lens/kube-api-specifics";
import { stopPropagation } from "@k-lens/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import React from "react";
import getMaybeDetailsUrlInjectable, {
  type GetMaybeDetailsUrl,
} from "../kube-detail-params/get-maybe-details-url.injectable";
import { MaybeLink } from "../maybe-link";
import { WithTooltip } from "../with-tooltip";

import type { RoleApi } from "@k-lens/kube-api";

interface Dependencies {
  getMaybeDetailsUrl: GetMaybeDetailsUrl;
  roleApi: RoleApi;
}

interface LinkToRoleProps {
  name?: string;
  namespace?: string;
}

function NonInjectedLinkToRole({ name, namespace, getMaybeDetailsUrl, roleApi }: LinkToRoleProps & Dependencies) {
  if (!name || !namespace) return null;

  return (
    <MaybeLink
      key="link"
      to={getMaybeDetailsUrl(
        roleApi.formatUrlForNotListing({
          name,
          namespace,
        }),
      )}
      onClick={stopPropagation}
    >
      <WithTooltip>{name}</WithTooltip>
    </MaybeLink>
  );
}

export const LinkToRole = withInjectables<Dependencies, LinkToRoleProps>(NonInjectedLinkToRole, {
  getProps: (di, props) => ({
    ...props,
    getMaybeDetailsUrl: di.inject(getMaybeDetailsUrlInjectable),
    roleApi: di.inject(roleApiInjectable),
  }),
});
