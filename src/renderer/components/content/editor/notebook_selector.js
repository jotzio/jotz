var React = require('react');
var NotebookCreator = require('./notebook_creator');

var NotebookSelector = React.createClass({
  getInitialState: function() {
    return {
      showCreate: false
    }
  },

  componentDidMount: function() {
    this.props.notebooks.on('add', this.updateComp, this);
  },

  updateComp: function() {
    this.forceUpdate();
  },

  changeNotebook: function(event) {
    if (event.target.value === 'create-new-notebook') {
      this.toggleNotebookInput();
    } else {
      this.props.updateNotebook({
        _id: event.target.value
      });
    }
  },

  toggleNotebookInput: function() {
    this.setState({
      showCreate: !this.state.showCreate
    });
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
    if(this.state.showCreate){
      return (
        <NotebookCreator
          toggleNotebookInput={this.toggleNotebookInput}
          updateNotebook={this.props.updateNotebook}
        />
      );
    }
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
