var React = require('react');
var actionCreator = require('../../actions/action_creator');

var NewNotebook = React.createClass({
  createNotebook: function() {
    //actionCreator.saveNotebook();
    this.props.toggleCreateNb();
  },

  renderInput: function(style) {
    return (
      <div style={style}>
        <input type='text' ref='new-notebook' placeholder='untitled' />
        <button onClick={this.createNotebook}>+ Notebook</button>
      </div>
    );
  },

  render: function() {
    //temporary styles to see things propah govnah
    var styles = {float: 'left'};
    if (this.props.showCreateNb) {
      return this.renderInput(styles);
    }
    return (
      <button style={styles} onClick={this.props.toggleCreateNb}>+ Notebook</button>
    );
  }
});

module.exports = NewNotebook;