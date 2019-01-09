<<<<<<< HEAD
'use strict';

const request = require('request'),
  constructReply = require('../lib/constructReply'),

  { uri, key } = require('../config/setupApi')('postnord');

/**
 * Custom component to interact with the Track and Trace API
 * and a Bot Skill.
 */
module.exports = {
	metadata: () => ({
		name: 'Custom.CheckShipment',
		properties: {
			shipmentId: {
				required: true,
				type: 'string',
			}
		},
		supportedActions: [
			'gotShipment',
			'noShipment',
			'idErr',
			'err',
			'shipmentStopped'
		]
	}),

	invoke: (conversation, done) => {
		const { shipmentId } = conversation.properties();

		request({
			uri: uri,
			qs: {
				id: shipmentId,
        		locale: 'en',
        		apikey: key
			}
		}, callback);

		function callback(err, res, body) {
			if (err) {
				// conversation.transition('err');
				conversation.variable('reply', err.message);
				conversation.transition('gotShipment');
			} else if (body) {
				body = JSON.parse(body);
				let TrackingInformationResponse = body.TrackingInformationResponse;

				if (TrackingInformationResponse &&
					TrackingInformationResponse.compositeFault) {
					let faults = TrackingInformationResponse.compositeFault.faults;
					faults.forEach(f => {
						// Check for invalidIdentifier fault
						if (f.faultCode === 'invalidIdentifier') {
							conversation.variable('reply', f.explanationText);
							conversation.transition('idErr');
						}
					});
				} else if (TrackingInformationResponse &&
						TrackingInformationResponse.shipments){
					let shipments = TrackingInformationResponse.shipments;

					if (shipments.length === 0) {
						conversation.transition('noShipment');
					} else {
						let deliveryDate = shipments[0].deliveryDate;

						if (deliveryDate) {
							conversation.variable('reply', constructReply(deliveryDate));
							conversation.transition('gotShipment');
						} else {
							conversation.variable('reply', constructReply());
							conversation.transition('shipmentStopped');
						}
					}
				} else {
					conversation.transition('err');
				}
			} else {
				conversation.transition('err');
			}

			done();
		}
	}
};
=======
'use strict';

const request = require('request'),
  constructReply = require('../lib/constructReply'),

  { uri, key } = require('../config/secret')('PROD');

/**
 * Custom component to interact with the Track and Trace API
 * and a Bot Skill.
 */
module.exports = {
	metadata: () => ({
		name: 'Custom.CheckShipment',
		properties: {
			shipmentId: {
				required: true,
				type: 'string',
			}
		},
		supportedActions: [
			'gotShipment',
			'noShipment',
			'idErr',
			'err',
			'shipmentStopped'
		]
	}),

	invoke: (conversation, done) => {
		const { shipmentId } = conversation.properties();

		request({
			uri: uri,
			qs: {
				id: shipmentId,
        		locale: 'en',
        		apikey: key
			}
		}, callback);

		function callback(err, res, body) {
			if (err) {
				conversation.transition('err');
			} else if (body) {
				body = JSON.parse(body);
				let TrackingInformationResponse = body.TrackingInformationResponse;

				if (TrackingInformationResponse &&
					TrackingInformationResponse.compositeFault) {
					let faults = TrackingInformationResponse.compositeFault.faults;
					faults.forEach(f => {
						// Check for invalidIdentifier fault
						if (f.faultCode === 'invalidIdentifier') {
							conversation.variable('reply', f.explanationText);
							conversation.transition('idErr');
						}
					});
				} else if (TrackingInformationResponse &&
						TrackingInformationResponse.shipments){
					let shipments = TrackingInformationResponse.shipments;

					if (shipments.length === 0) {
						conversation.transition('noShipment');
					} else {
						let deliveryDate = shipments[0].deliveryDate;

						if (deliveryDate) {
							conversation.variable('reply', constructReply(deliveryDate));
							conversation.transition('gotShipment');
						} else {
							conversation.variable('reply', constructReply());
							conversation.transition('shipmentStopped');
						}
					}
				} else {
					conversation.transition('err');
				}
			} else {
				conversation.transition('err');
			}

			done();
		}
	}
};
>>>>>>> b417abcd324f5495f5e9e438ae53c3637fd0330e
