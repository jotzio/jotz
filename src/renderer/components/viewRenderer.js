var React = require('react');

var SideMenu = require('./sideMenu/sideMenu');
var TopBar = require('./topBar/topbar');
var Content = require('./content/content');

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
    // TODO: REMOVE ME
    // For testing back-end of note creation
    props.notebookStore.dispatchCallback({ actionType: 'create-note', content: 'created note test content' });
  }
};
