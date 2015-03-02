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
      currentNote: null,
      view: 'Notes',
      filterQuery: '',
      openNotebookId: null
    };
  },

  componentDidMount: function() {
    actionCreator.fetchNotes();
    this.props.notes.on('add change remove', function(model) {
      var newState = React.addons.update(this.state, {
        currentNote: { $set: model }
      });
      this.setState(newState);
    }, this);
  },

  componentWillUnmount: function() {
    this.props.notes.off(null, null, this);
  },

  updateSearch: function (event) {
    var newState = React.addons.update(this.state, {
      filterQuery: { $set: event.target.value}
    });
    this.setState(newState);
  },

  swapView: function(newView, cb) {
    var newState = React.addons.update(this.state, {
      view: { $set: newView}
    });
    if (cb) {
      this.setState(newState, cb);
    } else {
      this.setState(newState);
    }
  },

  changeNote: function(newView, note, cb) {
    note = note || null;
    var newState = React.addons.update(this.state, {
      currentNote: { $set: note },
      view: { $set: newView }
    });
    if (cb) {
      this.setState(newState, cb);
    } else {
      this.setState(newState);
    }
  },

  openNotebook: function(id) {
    this.setState({
      openNotebookId: id
    });
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
            currentNote={this.state.currentNote}
            updateSearch={this.updateSearch}
            changeNote={this.changeNote}
          />
          <Content
            currentView={this.state.view}
            notes={this.props.notes}
            notebooks={this.props.notebooks}
            filterQuery={this.state.filterQuery}
            currentNote={this.state.currentNote}
            swapView={this.swapView}
            changeNote={this.changeNote}
            openNotebook={this.openNotebook}
            openNotebookId={this.state.openNotebookId}
          />
        </div>
      </div>
    );
  }
});

module.exports = Jotz;
