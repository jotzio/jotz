var React = require('react');
var Notes = require('./stores/notes');
var Notebooks = require('./stores/notebooks');

var Jotz = require('./components/jotz');

module.exports = {
  init: function() {
    React.render(<Jotz
      notes={Notes}
      notebooks={Notebooks}
    />, document.body);
  }
};
