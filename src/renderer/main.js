//Sets up React var globally
global.React = require('react');

var placeholder = 'Alas leggo my "leggo my eggo" legless lego legolas and leave illegible legalese legacies with legerity, lege of allegorist lasses';

var sideMenu = require('./components/sideMenu.js');
var underMenu = require('./components/underMenu.js');
var noteView = require('./components/noteView.js');

React.render(
  <SideMenu />,
  document.getElementById('sidemenu')
);

React.render(
  <UnderMenu />,
  document.getElementById('undermenu')
);

React.render(
  <NoteView note={placeholder} />,
  document.getElementById('noteview')
);
