var React = require('react');

var SideMenu = React.createClass({
  render: function() {
    return (
      <h1>Hello Side Menu</h1>
    );
  }
});

React.render(<SideMenu />, document.getElementById('sidemenu'));
