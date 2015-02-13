var React = require('react');

var placeholder = 'Alas leggo my "leggo my eggo" legless lego legolas and leave illegible legalese legacies with legerity, lege of allegorist lasses';

var SideMenu = require('./sideMenu');
var UnderMenu = require('./underMenu');
var NoteView = require('./noteView');

module.exports = {
  render: function(props) {
    React.render(
      <SideMenu />,
      document.getElementById('sidemenu')
    );

    React.render(
      <UnderMenu />,
      document.getElementById('undermenu')
    );

    React.render(
      <NoteView note={placeholder} notebookStore={props.notebookStore} />,
      document.getElementById('noteview')
    );
  }
};
