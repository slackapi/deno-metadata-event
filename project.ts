import { Project } from "slack-cloud-sdk/mod.ts";
import { ReceiveMetadataEventWorkflow } from "./workflows/receive_metadata_event.ts";
import { ReceiveMetadataEvent } from "./triggers/receive_metadata_event.ts";
import { SendMetadataEventFunction } from "./functions/send_metadata_event.ts";
import { SendMetadataEventWorkflow } from "./workflows/send_metadata_event.ts";
import { SendMetadataEventShortcut } from "./triggers/send_metadata_event_shortcut.ts";

Project({
  name: "Metadata Event App",
  description:
    "Learn how to send messages with metadata and create triggers that listen for events with custom metadata.",
  icon: "assets/icon.png",
  runtime: "deno1.x",
  botScopes: ["commands", "chat:write", "chat:write.public"],
  functions: [SendMetadataEventFunction],
  workflows: [ReceiveMetadataEventWorkflow, SendMetadataEventWorkflow],
  triggers: [ReceiveMetadataEvent, SendMetadataEventShortcut],
  tables: [],
  outgoingDomains: [],
});
