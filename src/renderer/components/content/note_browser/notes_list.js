var React = require('react');
var _ = require('underscore');
var NoteItem = require('./note_item');
var actionCreator = require('../../../actions/action_creator');

var NotesList = React.createClass({

  filterQuery: function(note) { 
    return note.title.toLowerCase().indexOf(this.props.filterQuery);
  },

  filterBlocks: function(note) {
    var blocks = _.pluck(note.blocks, 'content');
    return blocks.join(' ').toLowerCase().indexOf(this.props.filterQuery);
  },

  filterItems: function (note) {
    if (!this.props.filterQuery) {
      return true;
    } else {
      return this.filterQuery(note) > -1 || this.filterBlocks(note) > -1;
    }
  },

  renderNotes: function() {
    return _.filter(this.props.notes, this.filterItems).map(function(note) {
      return <NoteItem
        key={note._id}
        changeNote={this.props.changeNote}
        note={note}
      />;
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <h1>Hooray for the NotesList!!!</h1>
        <ul>
          {this.renderNotes()}
        </ul>
      </div>
    );
  }
});

module.exports = NotesList;

