// ============================================
// 🛡️ Renderer 글로벌 에러 핸들러 (앱 크래시 방지)
// ============================================
window.addEventListener("error", (event) => {
  console.error("[Renderer] Uncaught Error:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("[Renderer] Unhandled Rejection:", event.reason);
});

// 🎯 목적: CSS 로드 순서 - KLens 기존 스타일 먼저, shadcn globals.css 나중 (우선권 부여)
import "@k-lens/core/styles";
import "@k-lens/button/styles";
import "@k-lens/error-boundary/styles";
import "@k-lens/tooltip/styles";
import "@k-lens/resizing-anchor/styles";
import "@k-lens/icon/styles";
import "@k-lens/animate/styles";
// 🔄 Sonner 마이그레이션: notifications 패키지가 더 이상 별도 CSS를 필요로 하지 않음
// Sonner는 자체 스타일을 인라인으로 적용함
import "@k-lens/spinner/styles";
import "./shadcn-theme-overrides.css";
// 🎯 shadcn globals.css를 마지막에 로드하여 Tailwind 유틸리티 클래스가 우선권을 갖도록 설정
import "@k-lens/core/globals.css";

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

// shadcn 테마 feature import
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { shadcnThemeFeature } = require("../../../packages/core/src/renderer/themes/shadcn-theme.feature");
// user preferences feature import
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {
  userPreferencesFeature,
} = require("../../../packages/core/src/features/user-preferences/user-preferences.feature");

// AI Assistant feature (클러스터 프레임에서만 활성화)
import { aiAssistantFeature } from "../../../packages/core/src/features/ai-assistant/ai-assistant.feature";

const environment = "renderer";

const di = createContainer(environment, {
  detectCycles: false,
});

// 🎯 목적: 디버깅 편의를 위해 renderer DI 컨테이너를 window에 노출한다.
// ⚠️ 중요: 문제 해결 후 반드시 제거할 것 (현재는 조사 목적)
(globalThis as typeof globalThis & { __rendererDi?: typeof di }).__rendererDi = di;

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
    userPreferencesFeature, // user preferences feature 등록
    shadcnThemeFeature, // shadcn 테마 feature 등록
    aiAssistantFeature, // 🎯 ROOT/Cluster 모두 AI Assistant 등록 (스토어 singleton 공유)
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
