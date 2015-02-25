var React = require('react');

var NotebookSelector = React.createClass({
  handleChange: function(event) {
    if (event.target.value === 'newNotebook') {
      //show input for new notebook
    }
  },

  renderNotebooks: function() {
    return this.props.notebooks.map(function(notebook) {
      return (
        <option value={notebook._id}>{notebook.title}</option>
      );
    });
  },

  render: function() {
    return (
      //if no notebooks, display input
      <select onChange={this.handleChange}>
        {this.renderNotebooks}
      </select>
    );
  }
});

module.exports = NotebookSelector;