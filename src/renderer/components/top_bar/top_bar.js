var React = require('react');
var Note = require('../../stores/note');
var Search = require('./search');
var NewNotebook = require('./new_notebook');

/*
  Handles global note functions, create/search/filter.
 */

var TopBar = React.createClass({
  handleNewNote: function() {
    console.log('swapping to editor');
    this.props.swapView('Editor');
  },

  render: function() {
    return (
      <div className='topbar-container'>
        <div className='action-container'>
          <Search 
            filterQuery={this.props.filterQuery}
            updateSearch={this.props.updateSearch}
            swapView={this.props.swapView} 
          />
          <button className='btn' onClick={this.handleNewNote}>New Note</button>
          <NewNotebook toggleCreateNb={this.props.toggleCreateNb} showCreateNb={this.props.showCreateNb}/>
        </div>
      </div>
    );
  }
});

module.exports = TopBar;

