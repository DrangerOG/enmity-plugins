/**
 * @name NoDelete
 * @version 3.5.15
 * @description Somewhat basic "Message Logger"
 * @author Marek (modified by spin)
 * @source https://raw.githubusercontent.com/DrangerOG/enmity-plugins/master/dist/NoDelete.js
 */

(function () {
  const { getByProps } = enmity.metro;
  const { Toasts, Constants, Storage, Users } = enmity.metro.common;
  const { create } = enmity.patcher;
  const { registerPlugin } = enmity.managers.plugins;

  const Patcher = create("NoDelete");
  let currentUserID;

  const NoDelete = {
    name: "NoDelete",
    version: "3.5.15",
    description: "Somewhat basic Message Logger - shows deleted messages in red and cleanly updates edits.",
    authors: [{ name: "Marek (modified by spin)", id: "308440976723148800" }],

    onStart() {
      currentUserID = Users.getCurrentUser()?.id;

      const FluxDispatcher = getByProps(
        "_currentDispatchActionType",
        "_subscriptions",
        "_actionHandlers",
        "_waitQueue"
      );

      const MessageStore = getByProps("getMessage", "getMessages");
      const ChannelStore = getByProps("getChannel", "getDMFromUserId");

      // Wake up the dispatcher
      FluxDispatcher.dispatch({ type: "MESSAGE_UPDATE", message: {} });
      FluxDispatcher.dispatch({ type: "MESSAGE_DELETE", message: {} });

      // Handle deleted messages
      const MessageDelete = FluxDispatcher._actionHandlers._orderedActionHandlers?.MESSAGE_DELETE.find(
        (h) => h.name === "MessageStore"
      );

      Patcher.before(MessageDelete, "actionHandler", (_, args) => {
        const original = MessageStore.getMessage(args[0].channelId, args[0].id);
        if (!original || !original.content) return;

        FluxDispatcher.dispatch({
          type: "MESSAGE_UPDATE",
          message: {
            ...original,
            edited_timestamp: "invalid_timestamp",
            content: "```diff\n- " + original.content + "\n```"
          },
          log_edit: false
        });
      });

      // Handle edited messages
      const MessageUpdate = FluxDispatcher._actionHandlers._orderedActionHandlers?.MESSAGE_UPDATE.find(
        (h) => h.name === "MessageStore"
      );

      Patcher.before(MessageUpdate, "actionHandler", (_, args) => {
        const original = MessageStore.getMessage(args[0].message.channel_id, args[0].message.id);
        if (!original || !args[0]?.message?.content) return;
        args[0].message.content = args[0].message.content;
      });

      Toasts.open({
        content: "[NoDelete] Plugin loaded successfully.",
        source: "NoDelete",
        color: Constants.ThemeColorMap.BACKGROUND_ACCENT
      });
    },

    onStop() {
      Patcher.unpatchAll();
    }
  };

  registerPlugin(NoDelete);
})();
