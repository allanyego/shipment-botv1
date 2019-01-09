'use strict';

/**
 * Helper function to construct pretty message.
 * @param {Date} date
 * @return {String}
 */
module.exports = function constructReply(date) {
  if (typeof date !== 'string') {
  	return 'The shipment has been stopped during transport.';
  }

  const dDay = new Date(day);
  return "Your shipment will arrive on " + dDay.toLocaleDateString() + " at " +
    dDay.toLocaleTimeString() + ".";
};
