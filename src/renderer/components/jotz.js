var React = require('react/addons');
var SideMenu = require('./sidemenu/sidemenu');
var Content = require('./content/content');
var TopBar = require('./topBar/topBar');
var NotesStore = require('../stores/Notes');
var actionCreator = require('../actions/actionCreator');

/*
  This is where the applications state is created/managed.
  TODO: Link up fetchNotes to allNotes for notelist view (getInitialState)
  TODO: Decide on React.js style guide eg: changeView vs newNote
 */

var Jotz = React.createClass({

  //State created here
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
    NotesStore.on('all', function(result) {
      this.updateNotesList();
    }.bind(this), this);
  },

  componentWillUnmount: function() {
    NotesStore.off(null, null, this);
  },

  /*
    updateNotesList - updateBlocks are state managers. Passed to child components
    as helper functions to change application state.
   */

  updateNotesList: function() {
    var newState = React.addons.update(this.state, {
      jotzState: {
        allNotes: {
          $set: NotesStore.models
        }
      }
    });
    this.setState(newState);
  },

  changeView: function(newView) {
    var newState = React.addons.update(this.state, {
      jotzState: {
        view: {
          $set: newView
        }
      }
    });
    this.setState(newState);
  },

  //This changes view state to Editor, and currentNote to passed in note
  //Editor will automatically read currentNote via states
  newNote: function(note) {
    var newState = React.addons.update(this.state, {
      jotzState: {
        view: { $set: 'Editor' },
        currentNote: { $set: note }
      }});
    this.setState(newState);
  },

  updateNoteBlock: function(blocks) {
    var newState = React.addons.update(this.state, {
      jotzState: {
        currentNote: {
          blocks: { $set: blocks }
        }
      }});
    this.setState(newState);
  },

  //children will access states/data that are passed to them as props
  //never change props, clone and modify instead
  //pass callbacks that change state as props to children
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
            updateNoteBlock={this.updateNoteBlock}
            changeView={this.changeView}
          />
        </div>
      </div>
    )
  }
});

module.exports = Jotz;
