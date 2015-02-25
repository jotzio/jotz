var React = require('react');
var Editor = require('./editor/editor');
var NotesList = require('./note_browser/notes_list');
var NotesStore = require('../../stores/notes');

/*
  This manages what is displayed in the content area,
  Notes or Editor.
  TODO: Create NoteBook View
 */

var Content = React.createClass({

  //Checks view state, returns jsx for rendering
  renderContent: function() {
    if (this.props.view === 'Notes') {
      return (
        <NotesList
          filterQuery={this.props.filterQuery}
          notes={NotesStore}
          swapView={this.props.swapView}
        />
      );
    } else if (this.props.view === 'Editor') {
      return (
        <Editor
          note={this.props.currentNote}
          swapView={this.props.swapView}
        />
      );
    }
  },

  render: function() {
    var classes = 'content main-container ';
    return (
      <div className={classes}>
        {this.renderContent()}
      </div>
    );
  }
});

module.exports = Content;
