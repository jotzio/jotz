var React = require('react');
var NotebookCreator = require('./notebook_creator');

var NotebookSelector = React.createClass({
  getInitialState: function() {
    return {
      showCreate: false
    }
  },

  componentDidMount: function() {
    this.props.notebooks.on('all', this.updateComp, this);
  },

  updateComp: function() {
    this.forceUpdate();
  },

  changeNotebook: function(event) {
    if (event.target.value === 'create-new-notebook') {
      this.toggleNotebookInput();
    } else {
      this.props.updateNotebook(event.target.value);
    }
  },

  toggleNotebookInput: function() {
    this.setState({
      showCreate: !this.state.showCreate
    });
  },

  renderNotebooks: function() {
    return this.props.notebooks.map(function(notebook) {
      return(
        <option>{notebook.get('title')}</option>
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
      <select value={this.props.notebook || 'default'} onChange={this.changeNotebook}>
        <option value='default' disabled>Notebooks</option>
        {this.renderNotebooks()}
        <option value='create-new-notebook'>create notebook</option>
      </select>
    );
  }
});

module.exports = NotebookSelector;
