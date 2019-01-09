/**
 * Sets up configurations
 * @param {String} provider
 * @param {String} flag
 * @returns {Object}
 */
module.exports = function(provider, flag) {
	if (provider === 'postnord') {
		const o = require('./secret')(flag);
		return o;
	} 
	if (provider === 'mocklab') {
		return {
			uri: 'https://trackntrace.mocklab.io/findById',
			key: null
		};
	}
}