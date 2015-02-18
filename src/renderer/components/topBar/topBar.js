var React = require('react');
var newNote = require('../content/editor/newNote');

/*
  Handles global note functions, create/search/filter.
  TODO: Note Search
 */

var TopBar = React.createClass({
  handleNewNote: function() {
    var note = newNote();
    this.props.newNote(note);
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
