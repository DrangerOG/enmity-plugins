/* Enmity slash command structure created by Hauntii under the GNU GENERAL PUBLIC LICENSE. Do not remove this line. */
/* Modified by Spinfal aka Spin */
/* "Why rewrite what is already written?" */

import { ApplicationCommandInputType, ApplicationCommandType, Command } from "enmity/api/commands";
import { Navigation, React } from "enmity/metro/common";
import Page from "../../../common/components/_pluginSettings/Page";
import Logs from "../Logs";
import { sendReply } from "enmity/api/clyde";

const logs: Command = {
  id: "logs-command",

  name: "logs",
  displayName: "Logs",
  
  description: "Open the NoDelete message logs page",
  displayDescription: "Opens the page where you can view the deleted and edited message logs.",

  type: ApplicationCommandType.Chat,
  inputType: ApplicationCommandInputType.BuiltInText,

  // Executes the logs command
  execute: async function (args, message) {
    try {
      // Navigate to the logs page
      Navigation.push(Page, { component: Logs, name: "NoDelete Message Logs" });
    } catch (err) {
      // Handle errors and send a message to the channel
      console.log("[NoDelete Error]", err);
      sendReply(message?.channel.id ?? "0", "An error occurred while trying to open NoDelete message logs. Please check debug logs for more details.");
    }
  }
}

export { logs };
