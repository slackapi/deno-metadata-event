import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { SendMetadataEventWorkflow } from "../workflows/send_metadata_event.ts";

export const SendMetadataEventShortcut = DefineTrigger(
  "send_metadata_event_shortcut",
  {
    type: TriggerTypes.Shortcut,
    name: "Send a secret message",
    description: "Send a message to a channel with event metadata",
  },
)
  .runs(SendMetadataEventWorkflow)
  .withInputs((ctx) => ({
    message: "This message includes a secret",
    channel_id: ctx.data.channel_id,
    user_id: ctx.data.user_id,
  }));
