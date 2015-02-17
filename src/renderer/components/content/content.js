var React = require('react');

var NotesList = React.createClass({
  componentDidMount: function() {
    this.props.notebookStore.on('add', function() {
      this.forceUpdate();
    }.bind(this), this);
  },

  componentWillUnmount: function() {
    this.props.notebookStore.off(null, null, this);
  },

  render: function() {
    var notes = this.props.notebookStore.map(function(note) {
      return <li>{note.get('content')}</li>;
    });
    return (
      <div>
        <h1>Hooray for the NotesList!!!</h1>
        <ul>
          {notes}
        </ul>
      </div>
    );
  }
});

var Content = React.createClass({
  render: function() {
    var classes = 'content ';
    return (
      <div className={classes}>
        <h1>This is the main content area</h1>
        {this.props.view === 'Notes' ? <NotesList notebookStore={this.props.notebookStore}/> : null}
      </div>
    );
  }
});

module.exports = Content;
