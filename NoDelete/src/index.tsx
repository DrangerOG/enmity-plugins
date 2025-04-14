/*
    "When I wrote this, only God and I understood what I was doing.
    Now, God only knows."
*/

import { get, getBoolean, set, SettingsStore } from "enmity/api/settings";
import { FormDivider, FormInput, FormRow, FormSection, FormSwitch } from "enmity/components";
import { Plugin, registerPlugin } from "enmity/managers/plugins";
import { getByProps } from "enmity/metro";
import { Constants, React, Storage, StyleSheet, Toasts, Users } from "enmity/metro/common";
import { create } from "enmity/patcher";
import SettingsPage from "../../common/components/_pluginSettings/settingsPage";
import { Icons } from "../../common/components/_pluginSettings/utils";
import { updateLogStorage } from "../functions/updateLogStorage";
import manifest from "../manifest.json";
import { commands } from './commands';
import LogsToggle from "./LogsToggle";

interface SettingsProps {
    settings: SettingsStore;
}

const styles = StyleSheet.createThemedStyleSheet({
    icon: {
        color: Constants.ThemeColorMap.INTERACTIVE_NORMAL
    },
    item: {
        color: Constants.ThemeColorMap.TEXT_MUTED
    }
});

let currentUserID;
const Patcher = create(manifest.name);
const NoDelete: Plugin = {
    ...manifest,
    patches: [],

    onStart() {
        Storage.getItem("NoDeleteLogs").then((res: any) => {
            if (res == null) Storage.setItem("NoDeleteLogs", "[]")
        }).catch((err: any) => {
            console.log(`[${manifest.name} Storage Error]`, err);
        });

        let attempt = 0;
        const attempts = 3;
        const plugin = () => {
            const enableToasts = getBoolean(manifest.name, `${manifest.name}-toastEnable`, false);

            try {
                attempt++;

                const FluxDispatcher = getByProps(
                    "_currentDispatchActionType",
                    "_subscriptions",
                    "_actionHandlers",
                    "_waitQueue"
                );
                const MessageStore = getByProps("getMessage", "getMessages");
                const ChannelStore = getByProps("getChannel", "getDMFromUserId");

                for (const handler of ["MESSAGE_UPDATE", "MESSAGE_DELETE"]) {
                    try {
                        FluxDispatcher.dispatch({
                            type: handler,
                            message: {}, // force refresh
                        });
                    } catch (err) {
                        console.log(`[${manifest.name} Dispatch Error]`, err);
                    }
                }

                const MessageDelete = FluxDispatcher._actionHandlers._orderedActionHandlers?.MESSAGE_DELETE.find(
                    (h: any) => h.name === "MessageStore"
                );

                const MessageUpdate = FluxDispatcher._actionHandlers._orderedActionHandlers?.MESSAGE_UPDATE.find(
                    (h: any) => h.name === "MessageStore"
                );

                Patcher.before(MessageDelete, "actionHandler", (_, args) => {
                    const originalMessage = MessageStore.getMessage(
                        args[0].channelId,
                        args[0].id
                    );
                    if (!originalMessage?.author?.id || !originalMessage?.author?.username || (!originalMessage?.content && originalMessage?.attachments?.length == 0 && originalMessage?.embeds?.length == 0)) return;

                    if (!getBoolean("_nodelete", "_logBots", false) && originalMessage?.author?.bot) return;
                    if (!getBoolean("_nodelete", "_logSelf", false) && originalMessage?.author?.id == currentUserID) return;
                    if (!getBoolean("_nodelete", "_storageLog", false)) args[0] = {};

                    const redDeleted = `\`\`\`diff\n- ${originalMessage.content?.trim() || "Message deleted"}\n\`\`\``;

                    const editEvent = {
                        type: "MESSAGE_UPDATE",
                        message: {
                            ...originalMessage,
                            edited_timestamp: "invalid_timestamp",
                            content: redDeleted,
                            guild_id: ChannelStore.getChannel(originalMessage?.channel_id)?.guild_id,
                        },
                        log_edit: false
                    };

                    FluxDispatcher.dispatch(editEvent);

                    updateLogStorage("delete", {
                        username: `${originalMessage?.author?.username}#${originalMessage?.author?.discriminator}`,
                        id: originalMessage?.author?.id,
                        avatar: originalMessage?.author?.avatar,
                        bot: originalMessage?.author?.bot
                    }, {
                        guild: ChannelStore.getChannel(originalMessage?.channel_id)?.guild_id,
                        channel: originalMessage?.channel_id,
                        message: originalMessage?.id
                    }, {
                        time: originalMessage?.timestamp,
                        original: originalMessage?.content?.trim()
                    });
                });

                Patcher.before(MessageUpdate, "actionHandler", (_, args) => {
                    try {
                        const originalMessage = MessageStore.getMessage(
                            args[0].message.channel_id,
                            args[0].message.id
                        );

                        if (!originalMessage?.content || !args[0]?.message?.content) return;
                        if ((!args[0]?.message?.content && args[0]?.message?.attachments?.length == 0 && args[0]?.message?.embeds?.length == 0) || args[0]?.message?.embeds?.[0]?.type === "link") return;
                        if (args[0].log_edit === false) return;

                        if (!getBoolean("_nodelete", "_logBots", false) && args[0]?.message?.author?.bot) return;
                        if (!getBoolean("_nodelete", "_logSelf", false) && args[0]?.message?.author?.id == currentUserID) return;

                        try {
                            if (!args[0].edited_timestamp._isValid) return;
                        } catch {}

                        const newEditMessage = args[0].message.content;

                        if (!getBoolean("_nodelete", "_storageLog", false)) {
                            args[0].message.content = originalMessage?.content + "\n" + newEditMessage;
                        }

                        updateLogStorage("edit", {
                            username: `${args[0]?.message?.author?.username}#${args[0]?.message?.author?.discriminator}`,
                            id: args[0]?.message?.author?.id,
                            avatar: args[0]?.message?.author?.avatar,
                            bot: args[0]?.message?.author?.bot
                        }, {
                            guild: args[0].message.guild_id,
                            channel: args[0].message.channel_id,
                            message: args[0].message.id
                        }, {
                            time: args[0]?.message?.edited_timestamp,
                            original: originalMessage?.content?.trim(),
                            edited: newEditMessage?.trim()
                        });
                    } catch (err) {
                        console.log(`[${manifest.name} Error]`, err);
                    }
                });

                if (enableToasts) {
                    Toasts.open({
                        content: `[${manifest.name}] started successfully.`,
                        source: Icons.Success
                    });
                }
            } catch (err) {
                console.log(`[${manifest.name} Plugin Error]`, err);

                if (attempt < attempts) {
                    setTimeout(plugin, attempt * 10000);
                } else {
                    Toasts.open({
                        content: `${manifest.name} failed to start.`,
                        source: Icons.Failed
                    });
                }
            }
        };

        const mainLoop = () => {
            if (!Users.getCurrentUser()) {
                return setTimeout(mainLoop, 25);
            }
            currentUserID = Users.getCurrentUser().id;
            plugin();
        };

        setTimeout(mainLoop, 300);
        this.commands = commands;
    },

    onStop() {
        Patcher.unpatchAll();
        this.commands = [];
    },

    getSettingsPanel({ settings }: SettingsProps): any {
        return <SettingsPage manifest={manifest} settings={settings} hasToasts
