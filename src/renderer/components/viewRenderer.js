var React = require('react');

var SideMenu = require('./sideMenu/sideMenu');
var TopBar = require('./topBar/topbar');
var Content = require('./content/content');
var Editor = require('./content/editor/Editor');

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

    var editorStub = [ 0, 1, 2];
    React.render(
      <Editor noteBlocks={editorStub}/>,
      document.getElementById('content')
    );

  }
};
