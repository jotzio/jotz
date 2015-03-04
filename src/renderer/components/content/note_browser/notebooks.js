var React = require('react');
var NotesList = require('./notes_list');
var _ = require('underscore');

var NotebookList = React.createClass({

  showNotes: function(e, id) {
    e.preventDefault();
    this.props.openNotebook(id);
  },

  renderNotes: function(notebookId) {
    if (this.props.openNotebookId === notebookId) {
      //Added temporary styles to show border around notes in notebook view
      var styles = {
        border: '1px solid blue'
      };
      return (
        <div style={styles}>
          <NotesList
            notes={this.props.notes}
            changeNote={this.props.changeNote}
            filterNbId={this.props.openNotebookId}
            filterQuery={this.props.filterQuery}
          />
        </div>
      );
    }
    return null;
  },

  renderNotebook: function() {
    return this.props.notebooks.map(function(notebook) {
      return (
        <li>
          <a
            onClick={_.partial(this.showNotes, _, notebook.get('_id'))}
            href=''>{notebook.get('title')}
          </a>
          {this.renderNotes(notebook.get('_id'))}
        </li>
      );
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <h1>Notebooks</h1>
        <ul>
          {this.renderNotebook()}
        </ul>
      </div>
    );
  }
});

module.exports = NotebookList;
