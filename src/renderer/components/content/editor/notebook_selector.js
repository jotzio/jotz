var React = require('react');

var NotebookSelector = React.createClass({
  changeNotebook: function(event) {
    if (event.target.value === 'create-new-notebook') {
      this.props.toggleNotebookCreator();
    } else {
      var notebook = this.props.notebooks.findWhere({ _id: event.target.value }).toJSON();
      this.props.updateNotebook(notebook);
    }
  },

  renderNotebooks: function() {
    return this.props.notebooks.map(function(notebook) {
      var id = notebook.get('_id');
      var title = notebook.get('title');
      return(
        <option
          value={id}
          key={id}
        >{title}</option>
      );
    });
  },

  render: function() {
    return (
      <select value={this.props.notebookId || 'default'} onChange={this.changeNotebook}>
        <option value='default' disabled>Notebooks</option>
        {this.renderNotebooks()}
        <option value='create-new-notebook'>create notebook</option>
      </select>
    );
  }
});

module.exports = NotebookSelector;
