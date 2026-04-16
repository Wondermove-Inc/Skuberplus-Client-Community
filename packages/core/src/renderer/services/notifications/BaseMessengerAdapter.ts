import { NotificationMessage } from "./types";

export abstract class BaseMessengerAdapter {
  abstract send(msg: NotificationMessage): Promise<void>;
}
