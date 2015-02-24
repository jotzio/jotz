var React = require('react');

var Jotz = require('./components/jotz');

module.exports = {
  init: function() {
    React.render(<Jotz />, document.body);
  }
};
