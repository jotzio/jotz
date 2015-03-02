var React = require('react');
var Editor = require('./editor/editor');
var NotesList = require('./note_browser/notes_list');
var Notebooks = require('./note_browser/notebooks');

/*
  This manages what is displayed in the content area,
  Notes or Editor.
 */

var Content = React.createClass({

  renderNotes: function() {
    return <NotesList
      notes={this.props.notes}
      changeNote={this.props.changeNote}
      filterQuery={this.props.filterQuery}
    />;
  },

  renderNotebooks: function() {
    return <Notebooks
      notes={this.props.notes}
      notebooks={this.props.notebooks}
      changeNote={this.props.changeNote}
      filterQuery={this.props.filterQuery}
      openNotebook={this.props.openNotebook}
      openNotebookId={this.props.openNotebookId}
    />;
  },

  renderEditor: function() {
    return <Editor
      note={this.props.currentNote}
      notes={this.props.notes}
      notebooks={this.props.notebooks}
      changeNote={this.props.changeNote}
    />;
  },

  render: function() {
    var content = {
      Notes: this.renderNotes,
      Notebooks: this.renderNotebooks,
      Editor: this.renderEditor
    };
    var classes = 'content main-container ';
    return (
      <div className={classes}>
        {content[this.props.currentView]()}
      </div>
    );
  }
});

module.exports = Content;
