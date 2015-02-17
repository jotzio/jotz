var React = require('react');

var NotesList = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hooray for the NotesList!!!</h1>
      </div>
    );
  }
});

var Content = React.createClass({
  componentDidMount: function() {
    this.props.notebookStore.on('add', function() {
      this.forceUpdate();
    }.bind(this), this);
  },

  componentWillUnmount: function() {
    this.props.notebookStore.off(null, null, this);
  },

  render: function() {
    var classes = 'content ';
    var notes = this.props.notebookStore.map(function(note) {
      return <li>{note.get('content')}</li>;
    });
    return (
      <div className={classes}>
        <h1>This is the main content area</h1>
        {this.props.view === 'Notes' ? <NotesList /> : null}
        <ul>
          {notes}
        </ul>
      </div>
    );
  }
});

module.exports = Content;
