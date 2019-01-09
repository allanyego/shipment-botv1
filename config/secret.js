const dev = {
	uri: 'https://atapi2.postnord.com/rest/shipment/v1/trackandtrace/findByIdentifier.json',
	key: '45e16936c798ec9d7d8ca0ad66de9688'
};

const prod = {
	uri: 'https://api2.postnord.com/rest/shipment/v1/trackandtrace/findByIdentifier.json',
	key: '72965260c1a99107b2e35b00fb3aeac3'
};

/**
 * Returns configurations depending on provided flag
 * @param {String} flag
 * @returns {Object}
 */
module.exports = function(flag) {
	if (flag === 'DEV') {
		return dev;
	} else {
		return prod;
	}
};