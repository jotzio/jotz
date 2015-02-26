var React = require('react');
var Combobox = require('react-widgets').Combobox;

var NotebookSelector = React.createClass({
  componentDidMount: function() {
    this.props.notebooks.on('all', this.updateComp, this);
  },

  updateComp: function() {
    this.forceUpdate()
  },

  getNotebooks: function() {
    return this.props.notebooks.map(function(notebook) {
      return notebook.get('title');
    });
  },

  render: function() {
    return (
      <Combobox
        defaultValue={this.props.notebook}
        data={this.getNotebooks()}
        valueField='title'
        textField='title'
        onChange={this.props.updateNotebook}
      />
    );
  }
});

module.exports = NotebookSelector;
