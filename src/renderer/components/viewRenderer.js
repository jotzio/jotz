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

    var editorStub = {
      _id: 402334,
      title: 'Created Test Note Title',
      blocks: ['some', 'text', 'here'],
      notebookTitle: "Test Notebook",
      notebookId: "1sdlkn134ksdfwasdf"
    };
    React.render(
      <Editor note={editorStub}/>,
      document.getElementById('content')
    );

  }
};
