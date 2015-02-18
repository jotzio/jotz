var React = require('react');
var actionCreator = require('../../actions/actionCreator');

var TopBar = React.createClass({
  handleNewNote: function() {
    actionCreator.saveNote({
      title: 'Created Test Note Title',
      blocks: [{}, {}],
      notebook: {
        notebookTitle: "Test Notebook",
        notebookId: "1sdlkn134ksdfwasdf"
      }
    });
  },

  render: function() {
    return (
      <div>
        <div>
          <h1>Hello this is the top bar.</h1>
        </div>
        <div>
          <button onClick={this.handleNewNote}>New Note</button>
        </div>
      </div>
    );
  }
});

module.exports = TopBar;
