var React = require('react');
var actionCreator = require('../../actions/action_creator');

var Search = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },

  inputSubmit: function(e) {
    this.setState({value: ''});
  },

  handleChange: function(e) {
    this.setState({value: e.target.value});
  },

  handleSearch: function(e) {
    //_.escape()
    if (e.keyCode === 13) {
      actionCreator.searchNotes(this.state.value);
      console.log('searching and swapping to notes list');
      this.props.swapView('Notes');
    }
  },

  render: function() {
    var value = this.state.value;
    return (
      <input type='search' value={value} onKeyDown={this.handleSearch} onChange={this.handleChange} />
    );
  }
});

module.exports = Search;

