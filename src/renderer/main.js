global._ = require('underscore');
global.Backbone = require('backbone');
global.React = require('react');

var placeholder = 'Alas leggo my "leggo my eggo" legless lego legolas and leave illegible legalese legacies with legerity, lege of allegorist lasses';

var NoteStore = require('./stores/Note');
var NotebookStore = require('./stores/Notebook');
var SideMenu = require('./components/sideMenu.js');
var UnderMenu = require('./components/underMenu.js');
var NoteView = require('./components/noteView.js');

var Notebook = new NotebookStore();

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
