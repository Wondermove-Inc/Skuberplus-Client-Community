import { getInjectable } from "@ogre-tools/injectable";
import * as keytar from "keytar";
import { NotificationMessage } from "./types";

import type { BaseMessengerAdapter } from "./BaseMessengerAdapter";

const SERVICE_NAME = "skuberplus";
const ACCOUNT_NAME = "slack-webhook";

interface Settings {
  enabled: boolean;
  webhookUrl: string;
  alertMode: "all" | "critical" | "keywords";
  keywords: string;
}

class NotificationService {
  #settings: Settings = {
    enabled: false,
    webhookUrl: "",
    alertMode: "all",
    keywords: "",
  };

  #adapter: BaseMessengerAdapter | null = null;

  constructor() {
    this.#loadSettings();
  }

  async #loadSettings() {
    try {
      const webhookUrl = await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
      if (webhookUrl) {
        this.#settings.webhookUrl = webhookUrl;
        this.#settings.enabled = true;
      }
    } catch (error) {
      console.error("Failed to load notification settings:", error);
    }
  }

  async #saveSettings(webhookUrl: string) {
    try {
      await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, webhookUrl);
      this.#settings.webhookUrl = webhookUrl;
      this.#settings.enabled = true;
    } catch (error) {
      console.error("Failed to save notification settings:", error);
    }
  }

  async send(msg: NotificationMessage): Promise<void> {
    if (!this.#settings.enabled || !this.#settings.webhookUrl) {
      return;
    }

    if (!this.#shouldSend(msg)) {
      return;
    }

    if (!this.#adapter) {
      const { SlackAdapter } = await import("./SlackAdapter");
      this.#adapter = new SlackAdapter(this.#settings.webhookUrl);
    }

    await this.#adapter.send(msg);
  }

  #shouldSend(msg: NotificationMessage): boolean {
    const { alertMode, keywords } = this.#settings;

    if (alertMode === "all") return true;
    if (alertMode === "critical" && msg.level !== "info") return true;
    if (alertMode === "keywords") {
      const kwArray = keywords
        .toLowerCase()
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
      return kwArray.some((kw) => msg.text.toLowerCase().includes(kw));
    }
    return false;
  }

  async setWebhookUrl(webhookUrl: string) {
    await this.#saveSettings(webhookUrl);
  }

  get settings() {
    return { ...this.#settings };
  }

  updateSettings(updates: Partial<Settings>) {
    Object.assign(this.#settings, updates);
  }
}

export const notificationServiceInjectable = getInjectable({
  id: "notification-service-renderer",
  instantiate: () => new NotificationService(),
});
