export interface NotificationMessage {
  text: string;
  level: "info" | "warn" | "error";
  keywords?: string[];
  timestamp: Date;
}
