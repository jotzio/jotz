var React = require('react');

var NoteBookList = React.createClass({

  componentDidMount: function() {
    this.props.notebooks.on('add remove reset', function() {
      this.forceUpdate();
    }.bind(this), this);
  },

  componentWillUnmount: function() {
    this.props.notebooks.off(null, null, this);
  },

  renderNotebook: function() {
    return this.props.notebooks.map(function(notebook) {
      return (
        <li>{notebook.get('title')}</li>
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

module.exports = NoteBookList;
