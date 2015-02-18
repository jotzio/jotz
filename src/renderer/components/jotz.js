var React = require('react/addons');
var SideMenu = require('./sidemenu/sidemenu');
var Content = require('./content/content');
var TopBar = require('./topBar/topBar');
var NotebookStore = require('../stores/notebook');
var actionCreator = require('../actions/actionCreator');

var Editor = require('./content/editor/Editor');

var Jotz = React.createClass({
  getInitialState: function() {
    actionCreator.fetchNotes();
    return {
      jotzState: {
        view: 'Notes',
        allNotes: []
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

  render: function() {
    var right = 'right-container';
    var left = 'side-container';

    var stub =  {
      title: 'Created Test Note Title',
      blocks: ['some', 'text', 'here'],
      notebook: {
        notebookTitle: "Test Notebook",
        notebookId: "1sdlkn134ksdfwasdf"
      }
    };

    return (
      <div>
        <div className={left}>
          <SideMenu onChange={this.changeView}/>
        </div>
        <div className={right}>
          <TopBar />
          <Editor note={stub}/>
        </div>
      </div>
    )
  }
});
          //<Content allNotes={this.state.jotzState.allNotes} view={this.state.jotzState.view} />

module.exports = Jotz;
