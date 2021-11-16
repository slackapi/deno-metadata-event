# Message Metadata Event Sample

Please follow the tutorial for this repo at https://api.slack.com/tutorials/tracks/metadata-event.

This sample project shows how to send and receive message metadata events.

## Setup

Create a new project using this as repo as a template.

```bash
slack create -t slackapi/future-metadata-event 
```

You must update the Slack Channel ID for the `ReceiveMetadataEvent` trigger:
1. Open `triggers/receive_metadata_event.ts`
1. Update `CHANNEL_ID` to the channel where your app will be run

Optionally, you can customize the name of your message metadata event to avoid conflicts with other apps that use the same event name:
1. Open `functions/send_metadata_event.ts`
1. Update `MESSAGE_METADATA_EVENT_TYPE` to whatever your heart desires

## Running it locally

```bash
slack run
```

## Deploying to Slack's Hosting

```bash
slack deploy
```

## Testing

```bash
slack deno test
```

## Bundling
To bundle to stdout:

```bash
deno --unstable bundle .slack/run.ts
```

To bundle using the "hook", this required a path to a directory to package into that is expected to be used to zip for the deployment package:
(note /tmp/some-dir needs to exist!)
```
.slack/hooks/package /tmp/some-dir
```

The packaged zip file that is deployed should contain a single file named `bundle.js`. You might bundle and build that like this:
```
rm -rf ./package ./dist \
  && mkdir ./package ./dist \
  && deno --unstable bundle .slack/run.ts > ./package/bundle.js \
  && cd ./package \
  && zip -m ../dist/package.zip ./* \
  && cd .. \
  && rm -rf ../package \
  && echo "\n👋 Oh, hi there. The deployment zip is in ./dist/package.zip"
```

## Manifest and Slack.yaml
To generate a manifest:
```
deno --unstable run .slack/manifest.ts > manifest.json
```

To generate a slack.yaml file (yaml encoding of manifest):
```
deno --unstable run .slack/slack_yaml.ts > slack.yaml
```

To use the `manifest` hook to create a slack.yaml file in the project root:
```
.slack/hooks/manifest
```
