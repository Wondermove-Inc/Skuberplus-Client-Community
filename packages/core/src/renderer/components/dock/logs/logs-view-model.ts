/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { isDefined } from "@k-lens/utilities";
import assert from "assert";
import { computed } from "mobx";
import { isAllContainersSelected } from "./tab-store";

import type { ResourceDescriptor } from "@k-lens/kube-api";
import type { Pod, PodLogsQuery } from "@k-lens/kube-object";
import type { IComputedValue } from "mobx";

import type { SearchStore } from "../../../search-store/search-store";
import type { GetPodById } from "../../workloads-pods/get-pod-by-id.injectable";
import type { GetPodsByOwnerId } from "../../workloads-pods/get-pods-by-owner-id.injectable";
import type { TabId } from "../dock/store";
import type { LoadLogs } from "./load-logs.injectable";
import type { LogTabData } from "./tab-store";

export interface LogTabViewModelDependencies {
  getLogs: (tabId: TabId) => string[];
  getLogsWithoutTimestamps: (tabId: TabId) => string[];
  getTimestampSplitLogs: (tabId: TabId) => [string, string][];
  getLogTabData: (tabId: TabId) => LogTabData | undefined;
  setLogTabData: (tabId: TabId, data: LogTabData) => void;
  loadLogs: LoadLogs;
  reloadLogs: (
    tabId: TabId,
    pod: IComputedValue<Pod | undefined>,
    logTabData: IComputedValue<LogTabData | undefined>,
  ) => Promise<void>;
  renameTab: (tabId: TabId, title: string) => void;
  stopLoadingLogs: (tabId: TabId) => void;
  getPodById: GetPodById;
  getPodsByOwnerId: GetPodsByOwnerId;
  areLogsPresent: (tabId: TabId) => boolean;
  downloadLogs: (filename: string, logs: string[]) => void;
  downloadAllLogs: (params: ResourceDescriptor, query: PodLogsQuery) => Promise<void>;
  searchStore: SearchStore;
}

// Note: 이 클래스의 public 인터페이스를 변경할 경우
// log-window/log-window-page.tsx의 createLogTabViewModelAdapter도 함께 수정 필요
export class LogTabViewModel {
  constructor(
    protected readonly tabId: TabId,
    private readonly dependencies: LogTabViewModelDependencies,
  ) {}

  get searchStore() {
    return this.dependencies.searchStore;
  }

  readonly isLoading = computed(() => this.dependencies.areLogsPresent(this.tabId));
  readonly logs = computed(() => this.dependencies.getLogs(this.tabId));
  readonly logsWithoutTimestamps = computed(() => this.dependencies.getLogsWithoutTimestamps(this.tabId));
  readonly timestampSplitLogs = computed(() => this.dependencies.getTimestampSplitLogs(this.tabId));
  readonly logTabData = computed(() => this.dependencies.getLogTabData(this.tabId));
  readonly pods = computed(() => {
    const data = this.logTabData.get();

    if (!data) {
      return [];
    }

    if (typeof data.owner?.uid === "string") {
      return this.dependencies.getPodsByOwnerId(data.owner.uid);
    }

    return [this.dependencies.getPodById(data.selectedPodId)].filter(isDefined);
  });
  readonly pod = computed(() => {
    const data = this.logTabData.get();

    if (!data) {
      return undefined;
    }

    return this.dependencies.getPodById(data.selectedPodId);
  });

  updateLogTabData = (partialData: Partial<LogTabData>) => {
    const data = this.logTabData.get();

    assert(data, "Can only update data once it is set");

    this.dependencies.setLogTabData(this.tabId, { ...data, ...partialData });
  };

  loadLogs = () => this.dependencies.loadLogs(this.tabId, this.pod, this.logTabData);
  reloadLogs = () => this.dependencies.reloadLogs(this.tabId, this.pod, this.logTabData);
  renameTab = (title: string) => this.dependencies.renameTab(this.tabId, title);
  stopLoadingLogs = () => this.dependencies.stopLoadingLogs(this.tabId);

  downloadLogs = () => {
    const pod = this.pod.get();
    const tabData = this.logTabData.get();

    if (pod && tabData) {
      const podName = pod.getName();
      const fileName = isAllContainersSelected(tabData) ? `${podName}-all-containers.log` : `${podName}.log`;
      const logsToDownload: string[] = tabData.showTimestamps ? this.logs.get() : this.logsWithoutTimestamps.get();

      this.dependencies.downloadLogs(fileName, logsToDownload);
    }
  };

  downloadAllLogs = () => {
    const pod = this.pod.get();
    const tabData = this.logTabData.get();

    if (pod && tabData) {
      if (isAllContainersSelected(tabData)) {
        // K8s API only supports single container logs; download visible merged logs instead
        this.downloadLogs();

        return;
      }

      const params = { name: pod.getName(), namespace: pod.getNs() };
      const query = {
        timestamps: tabData.showTimestamps,
        previous: tabData.showPrevious,
        container: tabData.selectedContainer,
      };

      return this.dependencies.downloadAllLogs(params, query);
    }

    return;
  };
}
