var React = require('react');

var SideMenu = require('./sideMenu');
var TopBar = require('./topbar');
var Content = require('./content');

module.exports = {
  render: function(props) {
    React.render(
      <SideMenu />,
      document.getElementById('sidemenu')
    );

    React.render(
      <TopBar />,
      document.getElementById('topbar')
    );

    React.render(
      <Content notebookStore={props.notebookStore} />,
      document.getElementById('content')
    );
  }
};
