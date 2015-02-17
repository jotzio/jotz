var React = require('react');
var SideMenu = require('./sidemenu/sidemenu');
var Content = require('./content/content');
var TopBar = require('./topBar/topBar');
var NotebookStore = require('../stores/notebook');

var getNotesState = function() {
  // return {
  //   allNotes: NotebookStore.getAll()
  // };
};

var Jotz = React.createClass({
  getInitialState: function() {
    return null;
    // return getNotesState();
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

  render: function() {
    var right = 'right-container';
    var left = 'side-container';
    return (
      <div>
        <div className={left}>
          <SideMenu />
        </div>
        <div className={right}>
          <TopBar />
          <Content notebookStore={NotebookStore}/>
        </div>
      </div>
    )
  }
});

module.exports = Jotz;
