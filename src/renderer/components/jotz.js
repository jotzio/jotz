var React = require('react/addons');
var SideMenu = require('./side_menu/side_menu');
var Content = require('./content/content');
var TopBar = require('./top_bar/top_bar');
var actionCreator = require('../actions/action_creator');
//var NotesStore = require('../stores/notes');
//var NotebookStore = require('../stores/notebooks');

/*
  This is where the applications state is created/managed.
  TODO: Link up fetchNotes to allNotes for notelist view (getInitialState)
 */

var Jotz = React.createClass({

  getInitialState: function() {
    return {
      notes: null,
      notebooks: null,
      currentNote: null,
      view: 'Notes',
      filterQuery: ''
    };
  },

  componentDidMount: function() {
    actionCreator.fetchNotes();
    var updateStores = function() {
      var newState = React.addons.update(this.state, {
        notes: { $set: this.props.notes.toJSON() },
        notebooks: { $set: this.props.notebooks.toJSON() }
      });
      this.setState(newState);
    }.bind(this);
    this.props.notes.on('all', function() {
      updateStores();
    });
    this.props.notebooks.on('all', function() {
      updateStores();
    });
  },

  componentWillUnmount: function() {
    this.props.notes.off(null, null, this);
    this.props.notebooks.off(null, null, this);
  },

  updateSearch: function (event) {
    var newState = React.addons.update(this.state, {
      filterQuery: { $set: event.target.value}
    });
    this.setState(newState);
  },

  swapView: function(newView) {
    var newState = React.addons.update(this.state, {
      view: { $set: newView}
    });
    this.setState(newState);
  },

  changeNote: function(newView, note) {
    note = note || null;
    var newState = React.addons.update(this.state, {
      currentNote: { $set: note },
      view: { $set: newView }
    });
    this.setState(newState);
  },

  render: function() {
    return (
      <div>
        <div className='side-container'>
          <SideMenu
            currentView={this.state.view}
            swapView={this.swapView}
          />
        </div>
        <div className='right-container'>
          <TopBar 
            filterQuery={this.state.filterQuery}
            updateSearch={this.updateSearch}
            swapView={this.swapView}
          />
          <Content
            currentView={this.state.view}
            notes={this.state.notes}
            notebooks={this.state.notebooks}
            filterQuery={this.state.filterQuery}
            currentNote={this.state.currentNote}
            swapView={this.swapView}
            changeNote={this.changeNote}
          />
        </div>
      </div>
    );
  }
});

module.exports = Jotz;
