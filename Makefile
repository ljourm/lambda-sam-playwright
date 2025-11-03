build-ApiHealthFunction:
	cp dist/functions/api-health/index.js $(ARTIFACTS_DIR)/

build-SlackNotificationFunction:
	cp dist/functions/slack-notification/index.js $(ARTIFACTS_DIR)/
	cp config/slack-notification/message.yml $(ARTIFACTS_DIR)/message.yml
