var React = require('react');
var Combobox = require('react-widgets').Combobox;

var stub = [
  { _id:0, title:'these' },
  { _id:1, title:'are' },
  { _id:2, title:'all' },
  { _id:3, title:'tests' },
  { _id:4, title:'for' },
  { _id:5, title:'development' }
];

var NotebookSelector = React.createClass({
  componentDidMount: function() {
    this.props.notebooks.on('all', this.forceUpdate, this);
  },

  render: function() {
    return (
      //if no notebooks, display input
      <Combobox
        data={this.props.notebooks.models}
        valueField='title'
        textField='title'
        onChange={this.props.updateNotebook}
      />
    );
  }
});

module.exports = NotebookSelector;
