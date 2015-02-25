var React = require('react');

var Search = React.createClass({

  render: function() {
    return (
      <input 
        type='search' 
        ref='searchInput' 
        placeholder='Search Notes' 
        value={this.props.filterQuery} 
        onChange={this.props.updateSearch} 
       />
    );
  }
});

module.exports = Search;

