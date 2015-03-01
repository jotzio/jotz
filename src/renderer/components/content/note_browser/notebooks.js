var React = require('react')
var NotesList = require('./notes_list');

var NotebookList = React.createClass({

  //componentDidMount: function() {
  //  this.props.notebooks.on('add remove reset', function() {
  //    this.forceUpdate();
  //  }.bind(this), this);
  //},
  //
  //componentWillUnmount: function() {
  //  this.props.notebooks.off(null, null, this);
  //},

  renderNotes: function(notebookId) {
    if (this.props.openNotebookId === notebookId) {
      return (
        <NotesList
          notes={this.props.notes}
          changeNote={this.props.changeNote}
          filterId={this.props.openNotebookId}
          filterQuery={this.props.filterQuery}
        />
      );
    }
    return null;
  },

  renderNotebook: function() {
    return this.props.notebooks.map(function(notebook) {
      return (
        <li>
          <a onClick={this.showNotes} href=''>{notebook.get('title')}</a>
          {this.renderNotes(notebook.get('_id'))}
        </li>
      );
    });
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
