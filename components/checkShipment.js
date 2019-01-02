"use strict";

const request = require("request");
const uri = "https://atapi2.postnord.com/rest/shipment/v1/trackandtrace" +
	"/findByIdentifier.json?apikey=45e16936c798ec9d7d8ca0ad66de9688" +
	"&locale=en";

/**
 * Helper function to construct pretty message.
 * @param {Date} day
 * @return {String}
 */
function constructReply(day) {
    const date = deliveryDate.toLocaleDateString(),
		time = deliveryDate.toLocaleDateStringDateString();

	return "Your shipment will arrive on " + date + ", " + time + ".";
}

/**
 * Custom component to interact with the Track and Trace API
 * and a Bot Skill.
 */
module.exports = {
	metadata: () => ({
		name: "Custom.CheckShipment",
		properties: {
			shipmentId: {
				required: true,
				type: "string",
			}
		},
		supportedActions: [
			"gotShipment",
			"noShipment",
			"idErr",
			"err",
		]
	}),

	invoke: (conversation, done) => {
		const { shipmentId } = conversation.properties();

		request({
			uri: uri,
			qs: {
				id: shipmentId
			}
		}, callback);

		function callback(err, res, body) {
			if (err) {
				conversation.transition("err");
			} else if (body) {
				body = JSON.parse(body);
				let TrackingInformationResponse = body.TrackingInformationResponse;

				if (TrackingInformationResponse &&
					TrackingInformationResponse.compositeFault) {
					let faults = TrackingInformationResponse.compositeFault.faults;
					faults.forEach(f => {
						// Check for invalidIdentifier fault
						if (f.faultCode === "invalidIdentifier") {
							conversation.variable("reply", f.explanationText);
							conversation.transition("idErr");
						}
					});
				} else if (TrackingInformationResponse &&
						TrackingInformationResponse.shipments){
					let shipments = TrackingInformationResponse.shipments;

					if (shipments.length === 0) {
						conversation.transition("noShipment");
					} else {
						let deliveryDate = shipments[0].deliveryDate;
						let reply = constructReply(new Date(deliveryDate));

						conversation.variable("reply", reply);
						conversation.transition("gotShipment");
					}
				} else {
					conversation.transition("err");
				}
			} else {
				conversation.transition("err");
			}

			done();
		}
	}
};
