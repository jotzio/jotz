var React = require('react/addons');
var SideMenu = require('./side_menu/side_menu');
var Content = require('./content/content');
var TopBar = require('./top_bar/top_bar');
var NotesStore = require('../stores/notes');
var NotebookStore = require('../stores/notebooks');

/*
  This is where the applications state is created/managed.
  TODO: Link up fetchNotes to allNotes for notelist view (getInitialState)
 */

var Jotz = React.createClass({

  //State created here
  getInitialState: function() {
    console.log(this.props.notes.toJSON());
    return {
      notes: null,
      notebooks: null,
      view: 'Notes',
      currentNote: null,
      filterQuery: ''
    };
  },

  componentDidMount: function() {
    var update = function() {
      this.setState({
        notes: this.props.notes.toJSON(),
        notebooks: this.props.notebooks.toJSON()
      });
    };
    this.props.notes.on('all', function() {
      update();
    });
    this.props.notebooks.on('all', function() {
      update();
    });
  },

  componentWillUnmount: function() {
    this.props.notes.off(null, null, this);
    this.props.notebooks.off(null, null, this);
  },

  updateSearch: function (event) {
    this.setState({
      filterQuery: event.target.value
    });
  },

  swapView: function(newView, note) {
    note = note || null;
    this.setState({
      view: newView,
      currentNote: note
    });
  },

  //children will access states/data that are passed to them as props
  //never change props, clone and modify instead
  //pass callbacks that change state as props to children
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
          />
        </div>
      </div>
    );
  }
});

module.exports = Jotz;
