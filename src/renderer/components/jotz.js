var React = require('react/addons');
var SideMenu = require('./side_menu/side_menu');
var Content = require('./content/content');
var TopBar = require('./top_bar/top_bar');
var NotesStore = require('../stores/notes');
var actionCreator = require('../actions/action_creator');

/*
  This is where the applications state is created/managed.
  TODO: Link up fetchNotes to allNotes for notelist view (getInitialState)
  TODO: Decide on React.js style guide eg: changeView vs newNote
 */

var Jotz = React.createClass({

  //State created here
  getInitialState: function() {
    actionCreator.fetchNotes();
    actionCreator.fetchNotebooks();
    return {
      jotzState: {
        view: 'Notes',
        allNotes: NotesStore,
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
    updateNotesList & swapView are state managers. Passed to child components
    as helper functions to change application state.
   */

  updateNotesList: function() {
    var newState = React.addons.update(this.state, {
      jotzState: {
        allNotes: {
          $set: NotesStore
        }
      }
    });
    this.setState(newState);
  },

  swapView: function(newView, note) {
    note = note || null;
    var newState = React.addons.update(this.state, {
      jotzState: {
        view: { $set: newView },
        currentNote: { $set: note }
      }
    });
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
          <SideMenu swapView={this.swapView}/>
        </div>
        <div className={right}>
          <TopBar swapView={this.swapView}/>
          <Content
            allNotes={this.state.jotzState.allNotes}
            view={this.state.jotzState.view}
            currentNote={this.state.jotzState.currentNote}
            swapView={this.swapView}
          />
        </div>
      </div>
    );
  }
});

module.exports = Jotz;
