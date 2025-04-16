/**
 * NoDelete Plugin - Clean Version
 * Shows deleted messages in red and updates edited messages cleanly.
 */

(function () {
  const { getByProps } = enmity.metro;
  const { Storage, Users, Toasts, Constants } = enmity.metro.common;
  const { create } = enmity.patcher;
  const { registerPlugin } = enmity.managers.plugins;

  const Patcher = create("NoDelete");

  let currentUserID;

  const plugin = {
    name: "NoDelete",
    version: "1.0.0",
    description: "Shows deleted messages in red and updates edited ones without '[edited]' tag.",
    authors: [{ name: "YourName", id: "000000000000000000" }],

    onStart() {
      const FluxDispatcher = getByProps(
        "_currentDispatchActionType",
        "_subscriptions",
        "_actionHandlers",
        "_waitQueue"
      );

      const MessageStore = getByProps("getMessage", "getMessages");
      const ChannelStore = getByProps("getChannel", "getDMFromUserId");

      currentUserID = Users.getCurrentUser().id;

      // Patch message delete
      const MessageDelete = FluxDispatcher._actionHandlers._orderedActionHandlers?.MESSAGE_DELETE.find(
        (h) => h.name === "MessageStore"
      );

      Patcher.before(MessageDelete, "actionHandler", (_, args) => {
        const originalMessage = MessageStore.getMessage(args[0].channelId, args[0].id);
        if (!originalMessage?.content) return;

        const editEvent = {
          type: "MESSAGE_UPDATE",
          message: {
            ...originalMessage,
            edited_timestamp: "invalid_timestamp",
            content: originalMessage.content,
            colorString: "#ff4d4d"
          },
          log_edit: false
        };

        FluxDispatcher.dispatch(editEvent);
      });

      // Patch message edit
      const MessageUpdate = FluxDispatcher._actionHandlers._orderedActionHandlers?.MESSAGE_UPDATE.find(
        (h) => h.name === "MessageStore"
      );

      Patcher.before(MessageUpdate, "actionHandler", (_, args) => {
        const originalMessage = MessageStore.getMessage(
          args[0].message.channel_id,
          args[0].message.id
        );

        if (!originalMessage?.content || !args[0]?.message?.content) return;

        args[0].message.content = args[0]?.message?.content;
      });

      Toasts.open({
        content: "[NoDelete] Plugin enabled.",
        source: "NoDelete",
        color: Constants.ThemeColorMap.BACKGROUND_ACCENT
      });
    },

    onStop() {
      Patcher.unpatchAll();
    }
  };

  registerPlugin(plugin);
})();
