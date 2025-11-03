build-ApiHealthFunction:
	cp dist/functions/api-health/* $(ARTIFACTS_DIR)/

build-ApiV1SnapshotFunction:
	cp dist/functions/api-v1-snapshot/* $(ARTIFACTS_DIR)/

build-SlackNotificationFunction:
	cp dist/functions/slack-notification/* $(ARTIFACTS_DIR)/
	cp config/slack-notification/message.yml $(ARTIFACTS_DIR)/message.yml
