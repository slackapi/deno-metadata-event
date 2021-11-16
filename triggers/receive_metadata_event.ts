import { DefineTrigger, Schema, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { ReceiveMetadataEventWorkflow } from "../workflows/receive_metadata_event.ts";
import { MESSAGE_METADATA_EVENT_TYPE } from "../functions/send_metadata_event.ts";

// TODO - Update to be your Slack channel ID (e.g. "C02AL6F9NU9")
const CHANNEL_ID = "C0XXXXXXXXX";

export const ReceiveMetadataEvent = DefineTrigger(
  "receive_metadata_event",
  {
    type: TriggerTypes.Event,
    event_type: Schema.slack.events.MessageMetadataPosted,
    metadata_event_type: MESSAGE_METADATA_EVENT_TYPE,
  },
)
  .runs(ReceiveMetadataEventWorkflow)
  .withInputs((ctx) => ({
    channel_id: ctx.data.channel_id,
    metadata: ctx.data.metadata,
  }))
  .availableToChannel(CHANNEL_ID);
