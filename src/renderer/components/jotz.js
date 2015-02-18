var React = require('react/addons');
var SideMenu = require('./sidemenu/sidemenu');
var Content = require('./content/content');
var TopBar = require('./topBar/topBar');
var NotebookStore = require('../stores/notebook');
var actionCreator = require('../actions/actionCreator');

var Editor = require('./content/editor/Editor');
var newNote = require('./content/editor/newNote');

var Jotz = React.createClass({
  getInitialState: function() {
    actionCreator.fetchNotes();
    return {
      jotzState: {
        view: 'Notes',
        allNotes: [],
        currentNote: null
      }
    };
  },

  componentDidMount: function() {
    NotebookStore.on('all', function(result) {
      this.updateNotes();
    }.bind(this), this);
  },

  componentWillUnmount: function() {
    NotebookStore.off(null, null, this);
  },

  updateNotes: function() {
    var newState = React.addons.update(this.state, {jotzState: {allNotes: {$set: NotebookStore.models}}});
    this.setState(newState);
  },

  changeView: function(newView) {
    var newState = React.addons.update(this.state, {jotzState: {view: {$set: newView}}});
    this.setState(newState);
  },

  newNote: function() {
    var note = newNote();
    var newState = React.addons.update(this.state, {
      jotzState: {
        view: { $set: 'Editor' },
        currentNote: { $set: note }
      }});
    this.setState(newState);
  },

  render: function() {
    var right = 'right-container';
    var left = 'side-container';

    return (
      <div>
        <div className={left}>
          <SideMenu onChange={this.changeView}/>
        </div>
        <div className={right}>
          <TopBar newNote={this.newNote}/>
          <Content
            allNotes={this.state.jotzState.allNotes}
            view={this.state.jotzState.view}
            currentNote={this.state.jotzState.currentNote}
          />
        </div>
      </div>
    )
  }
});

          //<Editor note={stub}/>
module.exports = Jotz;
