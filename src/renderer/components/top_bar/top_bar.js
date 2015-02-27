var React = require('react');
var Note = require('../../stores/note');
var Search = require('./search');

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
            className='search-box'
            swapView={this.props.swapView}
          />
          <button className='btn' onClick={this.handleNewNote}>New Note</button>
        </div>
      </div>
    );
  }
});

module.exports = TopBar;

