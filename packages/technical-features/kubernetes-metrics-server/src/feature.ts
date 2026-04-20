import { applicationFeature } from "@k-lens/application";
import { getFeature } from "@k-lens/feature-core";
import { autoRegister } from "@ogre-tools/injectable-extension-for-auto-registration";

export const kubernetesMetricsServerFeature = getFeature({
  id: "kubernetes-metrics-server",

  register: (di) => {
    autoRegister({
      di,
      targetModule: module,
      getRequireContexts: () => [require.context("./", true, /\.injectable\.(ts|tsx)$/)],
    });
  },

  dependencies: [applicationFeature],
});
