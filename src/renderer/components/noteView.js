var React = require('react');
var actionCreator = require('../actions/actionCreator');

var NoteViewMenu = React.createClass({
  makeNote: function(note) {
    debugger
    actionCreator.makeNote(note);
  },

  render: function() {
    return(
      <div>
        <button onClick={this.makeNote(this.props.note)}>Make Note</button>
      </div>
    );
  }
});

var NoteView = React.createClass({

  componentDidMount: function() {
    this.props.notebookStore.on('add', function() {
      this.forceUpdate();
    }.bind(this), this);
  },

  componentWillUnmount: function() {
    this.props.notebookStore.off(null, null, this);
  },

  render: function() {
    var classes = 'note ';
    debugger
    var notes = this.props.notebookStore.map(function(note) {
      return <li>{note}</li>;
    });
    return (
      <div className={classes}>
        <NoteViewMenu note={this.props.note}/>
        <ul>
          {notes}
        </ul>
      </div>
    );
  }
});

module.exports = NoteView;
