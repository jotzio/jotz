var React = require('react');
var _ = require('underscore');
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

  filterQuery: function(note) { 
    return note.get('title')
               .toLowerCase()
               .indexOf(this.props.filterQuery);
  },

  filterBlocks: function(note) {
    var blocks = _.pluck(note.get('blocks'), 'content');
    return blocks.join(' ')
                 .toLowerCase()
                 .indexOf(this.props.filterQuery);
  },

  filterItems: function (note) {
    if (!this.props.filterQuery) {
      return true;
    } else {
      return this.filterQuery(note) > -1 || this.filterBlocks(note) > -1;
    }
  },

  render: function() {
    var notes = this.props.notes.filter(this.filterItems).map(function(note) {
                  return <NoteItem 
                            key={note.get('_id')} 
                            swapView={this.props.swapView} 
                            note={note} 
                          />;
                }.bind(this));
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

module.exports = NotesList;

