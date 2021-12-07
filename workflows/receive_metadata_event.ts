import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";

export const ReceiveMetadataEventWorkflow = DefineWorkflow(
  "receive_metadata_event_workflow",
  {
    title: "Receives and responds to a metadata event",
    description: "Receives a metadata event and sends a message in response",
    input_parameters: {
      required: ["metadata", "channel_id"],
      properties: {
        metadata: {
          type: Schema.types.object,
          description: "Custom message metadata",
        },
        channel_id: {
          type: Schema.slack.types.channel_id,
          description: "Channel to send the message",
        },
      },
    },
  },
);

ReceiveMetadataEventWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: ReceiveMetadataEventWorkflow.inputs.channel_id,
  message:
    `:magic_wand: Revealing the secret message:\n> ${ReceiveMetadataEventWorkflow
      .inputs.metadata.event_payload?.secret} - <@${ReceiveMetadataEventWorkflow
      .inputs.metadata.event_payload?.user_id}>`,
});
