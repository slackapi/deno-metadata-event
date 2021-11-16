import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { SendMetadataEventFunction } from "../functions/send_metadata_event.ts";

export const SendMetadataEventWorkflow = DefineWorkflow(
  "send_metadata_event_workflow",
  {
    title: "Send a message with metadata",
    description: "Send a message with custom metadata",
    input_parameters: {
      message: {
        type: Schema.types.string,
        description: "Message to send",
      },
      secret: {
        type: Schema.types.string,
        description: "Secret message included as metadata",
      },
      channel_id: {
        type: Schema.slack.types.channel_id,
        description: "Channel to send the message",
      },
      user_id: {
        type: Schema.slack.types.user_id,
        description: "User who created the message",
      },
    },
  },
);

SendMetadataEventWorkflow.addStep(SendMetadataEventFunction, {
  message: SendMetadataEventWorkflow.inputs.message,
  secret: SendMetadataEventWorkflow.inputs.secret,
  channel_id: SendMetadataEventWorkflow.inputs.channel_id,
  user_id: SendMetadataEventWorkflow.inputs.user_id,
});
