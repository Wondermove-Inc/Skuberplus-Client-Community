import { BaseMessengerAdapter } from "./BaseMessengerAdapter";
import { NotificationMessage } from "./types";

export class SlackAdapter extends BaseMessengerAdapter {
  #webhookUrl: string;

  constructor(webhookUrl: string) {
    super();
    this.#webhookUrl = webhookUrl;
  }

  async send(msg: NotificationMessage): Promise<void> {
    const maskedText = this.#maskSensitive(msg.text);
    const payload = {
      text: maskedText,
      username: "K-Lens Notifications",
      icon_emoji: this.#getEmoji(msg.level),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(this.#webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Slack notification failed:", error);
    }
  }

  #maskSensitive(text: string): string {
    return text
      .replace(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g, "[IP]")
      .replace(/k8s:\/\/[^\s]+/g, "k8s://[masked]")
      .replace(/token=[^\s]+/g, "token=[masked]")
      .replace(/secret=[^\s]+/g, "secret=[masked]");
  }

  #getEmoji(level: string): string {
    switch (level) {
      case "error":
        return ":rotating_light:";
      case "warn":
        return ":warning:";
      default:
        return ":bell:";
    }
  }
}
