'use strict';

/**
 * Helper function to construct pretty message.
 * @param {Date} day
 * @return {String}
 */
module.exports = function constructReply(day) {
  const dDay = new Date(day);

	return "Your shipment will arrive on " + dDay.toLocaleDateString() + " at " +
    dDay.toLocaleTimeString() + ".";
};
