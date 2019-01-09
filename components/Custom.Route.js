'use strict';

/**
 * Custom routing component.
 */
module.exports = {
	metadata: () => ({
		name: 'Custom.Route',
		properties: {},
		supportedActions: [
			'lookup'
		]
	}),

	invoke: (conversation, done) => {
		const payload = conversation.payload();

		// Extract action (should be shipment ID) and activate tracking state.
		if (payload['messagePayload']) {
			const msgPayload = payload['messagePayload'];

			if (msgPayload['postback']) {
				const action = msgPayload['postback']['action'];

				conversation.variable('shipmentIdentifier', action);
				conversation.keepTurn(true);
				conversation.transition('lookup');
			}
		}

		done();
	}
};
