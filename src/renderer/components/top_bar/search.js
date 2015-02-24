var React = require('react');

var Search = React.createClass({
  getDefaultProps: function() {
    return {
      query: ''
    };
  },

  search: function() {
    var query=this.refs.searchInput.getDOMNode().value;
    this.props.setFilter(query);
  },

  render: function() {
    return (
      <input type='search' ref='searchInput' placeholder='Search Notes' value={this.props.query} onChange={this.search} />
    );
  }
});

module.exports = Search;

