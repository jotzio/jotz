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
      this.setState({showCreate: true});
      return;
    }
    var title = event.target.value || event;
    this.props.updateNotebook(title);
    this.setState({showCreate: false});
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
        <NotebookCreator changeNotebook={this.props.changeNotebook} />
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
