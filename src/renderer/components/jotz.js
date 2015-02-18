var React = require('react/addons');
var SideMenu = require('./sidemenu/sidemenu');
var Content = require('./content/content');
var TopBar = require('./topBar/topBar');
var NotebookStore = require('../stores/notebook');
var actionCreator = require('../actions/actionCreator');

var Jotz = React.createClass({
  getInitialState: function() {
    actionCreator.fetchNotes();
    return {
      jotzState: {
        view: 'Notes',
        allNotes: NotebookStore.models
      }
    };
  },

  changeView: function(newView) {
    var newState = React.addons.update(this.state, {jotzState: {view: {$set: newView}}});
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
          <TopBar />
          <Content allNotes={this.state.jotzState.allNotes} view={this.state.jotzState.view} />
        </div>
      </div>
    )
  }
});

module.exports = Jotz;
