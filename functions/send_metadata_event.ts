import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";

// TODO - Customize the name of your message metadata event
export const MESSAGE_METADATA_EVENT_TYPE = "secret_message_event_type";

export const SendMetadataEventFunction = DefineFunction(
  "send_metadata_event_function",
  {
    title: "Send a message with metadata",
    description: "Sends a message with a event metadata into a channel",
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
        description: "User included as metadata",
      },
    },
    output_parameters: {
      ok: {
        type: Schema.types.boolean,
        description: "Returns true if the message was send successfully",
      },
    },
  },
  async ({ inputs, client }) => {
    console.log(`SendMetadataEventFunction inputs: ${JSON.stringify(inputs)}`);

    const resp = await client.call("chat.postMessage", {
      text: `:speech_balloon: ${inputs.message}`,
      channel: inputs.channel_id,
      metadata: {
        event_type: MESSAGE_METADATA_EVENT_TYPE,
        event_payload: {
          message: inputs.message,
          secret: inputs.secret,
          user_id: inputs.user_id,
        },
      },
    });

    if (!resp.ok) {
      console.log(`Error sending message: ${resp.error}`);
    } else {
      console.log(`Successfully sent message: ${JSON.stringify(resp)}`);
    }

    return {
      outputs: {
        ok: resp.ok,
      },
    };
  },
);
