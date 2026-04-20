import { keyboardShortcutInjectionToken } from "@k-lens/keyboard-shortcuts";
import { getInjectable } from "@ogre-tools/injectable";
import tableFocusManagerInjectable from "../components/table/table-focus-manager.injectable";

const tableNavLastShortcutInjectable = getInjectable({
  id: "k9s-table-nav-last",

  instantiate: (di) => {
    const tableFocusManager = di.inject(tableFocusManagerInjectable);

    return {
      binding: { code: "KeyG", shift: true },
      invoke: () => tableFocusManager.goToLast(),
    };
  },

  injectionToken: keyboardShortcutInjectionToken,
});

export default tableNavLastShortcutInjectable;
