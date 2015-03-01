var React = require('react');
var _ = require('underscore');
var NoteItem = require('./note_item');


var NotesList = React.createClass({

  filterTitle: function(note) {
    return note.get('title').toLowerCase().indexOf(this.props.filterQuery);
  },

  filterBlocks: function(note) {
    var blocks = _.pluck(note.get('blocks'), 'content');
    return blocks.join(' ').toLowerCase().indexOf(this.props.filterQuery);
  },

  filterId: function() {
    return this.props.notes.find({notebook: { _id: this.props.filterId }});
  },

  filterItems: function (note) {
    if (!this.props.filterQuery || !this.props.filterId) {
      return true;
    } else {
      return this.filterTitle(note) > -1 || this.filterBlocks(note) > -1;
    }
  },

  renderNotes: function() {
    var notes = this.props.notes.models;
    if (this.props.filterId) {
      notes = this.filterId();
    }
    return _.filter(notes, this.filterItems).map(function(note) {
      return <NoteItem
        key={note.attributes._id}
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

