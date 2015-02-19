var React = require('react');
var createNote = require('../content/editor/createNote');

/*
  Handles global note functions, create/search/filter.
  TODO: Note Search
 */

var TopBar = React.createClass({
  handleNewNote: function() {
    var note = createNote();
    this.props.newNote(note);
  },

  render: function() {
    return (
      <div className='topbar-container'>
        <div className='action-container'>
          <button className='btn' onClick={this.handleNewNote}>New Note</button>
        </div>
      </div>
    );
  }
});

module.exports = TopBar;
