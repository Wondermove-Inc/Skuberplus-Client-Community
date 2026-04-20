import { applicationFeature } from "@k-lens/application";
import { getFeature } from "@k-lens/feature-core";
import { autoRegister } from "@ogre-tools/injectable-extension-for-auto-registration";

export const prometheusFeature = getFeature({
  id: "prometheus",

  register: (di) => {
    // 🎯 Prometheus Provider들 자동 등록 (showInUI: false로 UI에 숨김)
    autoRegister({
      di,
      targetModule: module,
      getRequireContexts: () => [require.context("./", true, /\.injectable\.(ts|tsx)$/)],
    });
  },

  dependencies: [applicationFeature],
});
