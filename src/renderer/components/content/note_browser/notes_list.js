var React = require('react');
var NoteItem = require('./note_item');
var actionCreator = require('../../../actions/action_creator');

var NotesList = React.createClass({

  componentDidMount: function() {
    this.props.notes.on('add remove reset', function() {
      this.forceUpdate();
    }.bind(this), this);
  },

  componentWillUnmount: function() {
    this.props.notes.off(null, null, this);
  },

  render: function() {
    return (
      <div>
        <h1>Hooray for the NotesList!!!</h1>
        <ul>
          {this.props.notes.map(function(note) {
            return <NoteItem key={note.get('_id')} swapView={this.props.swapView} note={note} />;
          }.bind(this))}
        </ul>
      </div>
    );
  }
});

module.exports = NotesList;

