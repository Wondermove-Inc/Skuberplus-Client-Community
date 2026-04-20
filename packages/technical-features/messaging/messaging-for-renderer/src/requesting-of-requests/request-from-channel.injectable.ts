import { requestFromChannelInjectionToken } from "@k-lens/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import invokeIpcInjectable from "./invoke-ipc.injectable";

import type { RequestFromChannel } from "@k-lens/messaging";

const requestFromChannelInjectable = getInjectable({
  id: "request-from-channel",

  instantiate: (di) => {
    const invokeIpc = di.inject(invokeIpcInjectable);

    return ((channel, request) => invokeIpc(channel.id, request)) as RequestFromChannel;
  },

  injectionToken: requestFromChannelInjectionToken,
});

export default requestFromChannelInjectable;
