var React = require('react');
var Note = require('../../stores/Note');

/*
  Handles global note functions, create/search/filter.
  TODO: Note Search
 */

var TopBar = React.createClass({
  handleNewNote: function() {
    var note = new Note(
      {
        blocks: [
          {
            language: 'text',
            content: ''
          }
        ]
      }
    );
    this.props.swapNoteView(note);
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

