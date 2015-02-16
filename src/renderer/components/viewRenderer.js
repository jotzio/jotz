var React = require('react');

//var SideMenu = require('./sideMenu/sideMenu');
//var TopBar = require('./topBar/topbar');
var Content = require('./content/content');
var Editor = require('./content/editor/Editor');

module.exports = {
  render: function(props) {
    //React.render(
    //  <SideMenu />,
    //  document.getElementById('sidemenu')
    //);
    //
    //React.render(
    //  <TopBar />,
    //  document.getElementById('topbar')
    //);

    React.render(
      <Editor />,
      document.getElementById('content')
    );

  }
};
