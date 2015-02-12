var React = require('react');

var UnderMenu = React.createClass({
  render: function() {
    return (
      <h1>Hello Under Menu</h1>
    );
  }
});

React.render(<UnderMenu />, document.getElementById('undermenu'));
