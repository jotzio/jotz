var React = require('react');

var Content = React.createClass({
  render: function() {
    var classes = 'content ';
    return (
      <div className={classes}>
        <h1>This is the main content area</h1>
      </div>
    );
  }
});

module.exports = Content;
