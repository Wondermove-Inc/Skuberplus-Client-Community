// 🎯 목적: CSS 로드 순서 - KLens 기존 스타일 먼저, shadcn globals.css 나중 (우선권 부여)
import "@k-lens/core/styles";
import "@k-lens/button/styles";
import "@k-lens/error-boundary/styles";
import "@k-lens/tooltip/styles";
import "@k-lens/resizing-anchor/styles";
import "@k-lens/icon/styles";
import "@k-lens/animate/styles";
import "@k-lens/notifications/styles";
import "@k-lens/spinner/styles";
import "./shadcn-theme-overrides.css";
// 🎯 shadcn globals.css를 마지막에 로드하여 Tailwind 유틸리티 클래스가 우선권을 갖도록 설정
import "@k-lens/core/globals.css";
// 🎯 목적: 기본 테마 클래스를 적용하여 globals.css 토큰이 활성화되도록 설정
// DOM이 완전히 로드된 후 실행되도록 보장
function applyDefaultTheme() {
  const htmlElement = document.documentElement;
  const hasAnyThemeClass = Array.from(htmlElement.classList).some((className) => className.startsWith("theme-"));

  // 🎯 목적: 초기 진입 시 테마 클래스가 전혀 없을 때만 기본 테마를 주입
  // ⚠️ 중요: 사용자 설정으로 적용된 테마를 DOMContentLoaded 훅이 다시 덮어쓰지 않도록 방지
  if (hasAnyThemeClass) {
    console.log("[THEME-INIT] Skip: theme-* class already present", htmlElement.classList.value);
    return;
  }

  const defaultThemeClasses = ["theme-default-dark", "theme-blue-dark"];
  console.log("[THEME-INIT] Applying default theme classes:", defaultThemeClasses);

  for (const themeClass of defaultThemeClasses) {
    htmlElement.classList.add(themeClass);
  }

  console.log("[THEME-INIT] Final classList:", htmlElement.classList.value);
}
// 즉시 실행 + DOMContentLoaded에서도 실행 (보험)
if (typeof document !== "undefined") {
  applyDefaultTheme();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyDefaultTheme);
  }
}

import { animateFeature } from "@k-lens/animate";
import { applicationFeature, startApplicationInjectionToken } from "@k-lens/application";
import { clusterSidebarFeature } from "@k-lens/cluster-sidebar";
import {
  commonExtensionApi as Common,
  metricsFeature,
  rendererExtensionApi as Renderer,
  registerLensCore,
} from "@k-lens/core/renderer";
import { registerFeature } from "@k-lens/feature-core";
import { keyboardShortcutsFeature } from "@k-lens/keyboard-shortcuts";
import { kubeApiSpecificsFeature } from "@k-lens/kube-api-specifics";
import { kubernetesMetricsServerFeature } from "@k-lens/kubernetes-metrics-server";
import { loggerFeature } from "@k-lens/logger";
import { messagingFeatureForRenderer } from "@k-lens/messaging-for-renderer";
import { notificationsFeature } from "@k-lens/notifications";
import { randomFeature } from "@k-lens/random";
import { reactApplicationFeature } from "@k-lens/react-application";
import { routingFeature } from "@k-lens/routing";
import { createContainer } from "@ogre-tools/injectable";
import { autoRegister } from "@ogre-tools/injectable-extension-for-auto-registration";
import { registerMobX } from "@ogre-tools/injectable-extension-for-mobx";
import { registerInjectableReact } from "@ogre-tools/injectable-react";
import { runInAction } from "mobx";

const environment = "renderer";
const di = createContainer(environment, {
  detectCycles: false,
});
// 🎯 목적: 디버깅 편의를 위해 renderer DI 컨테이너를 window에 노출한다.
// ⚠️ 중요: 문제 해결 후 반드시 제거할 것 (현재는 조사 목적)
globalThis.__rendererDi = di;
runInAction(() => {
  registerMobX(di);
  registerInjectableReact(di);
  registerLensCore(di, environment);
  registerFeature(di, loggerFeature);
  registerFeature(
    di,
    applicationFeature,
    messagingFeatureForRenderer,
    keyboardShortcutsFeature,
    reactApplicationFeature,
    routingFeature,
    metricsFeature,
    animateFeature,
    clusterSidebarFeature,
    randomFeature,
    kubeApiSpecificsFeature,
    kubernetesMetricsServerFeature,
    notificationsFeature,
  );
  autoRegister({
    di,
    targetModule: module,
    getRequireContexts: () => [
      require.context("./", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
      require.context("../common", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
    ],
  });
});
const startApplication = di.inject(startApplicationInjectionToken);
startApplication();

export {
  Mobx,
  MobxReact,
  React,
  ReactDOM,
  ReactJsxRuntime,
  ReactRouter,
  ReactRouterDom,
} from "@k-lens/core/renderer";
export const LensExtensions = {
  Renderer,
  Common,
};
//# sourceMappingURL=index.js.map
