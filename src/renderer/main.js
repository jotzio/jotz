var React = require('react');

require('node-jsx').install();

var Jotz = require('./components/jotz');

module.exports = {
  init: function() {
    React.render(<Jotz />, document.body);
  }
};
