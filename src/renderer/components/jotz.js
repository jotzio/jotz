var React = require('react/addons');
var SideMenu = require('./side_menu/side_menu');
var Content = require('./content/content');
var TopBar = require('./top_bar/top_bar');
var actionCreator = require('../actions/action_creator');

/*
  This is where the applications state is created/managed.
  TODO: Link up fetchNotes to allNotes for notelist view (getInitialState)
  TODO: Decide on React.js style guide eg: changeView vs newNote
 */

var Jotz = React.createClass({

  //State created here
  getInitialState: function() {
    return {
      view: 'Notes',
      currentNote: null,
      filterQuery: ''
      createNotebook: false
    };
  },

  updateSearch: function (event) {
    this.setState({
      filterQuery: event.target.value
    });
  },

  toggleCreateNb: function() {
    this.setState({
      createNotebook: !this.state.createNotebook
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
          <SideMenu swapView={this.swapView}/>
        </div>
        <div className='right-container'>
          <TopBar 
            filterQuery={this.state.filterQuery}
            updateSearch={this.updateSearch}
            swapView={this.swapView}
            toggleCreateNb={this.toggleCreateNb}
            showCreateNb={this.state.createNotebook}
          />
          <Content
            filterQuery={this.state.filterQuery}
            view={this.state.view}
            swapView={this.swapView}
          />
        </div>
      </div>
    );
  }
});

module.exports = Jotz;
