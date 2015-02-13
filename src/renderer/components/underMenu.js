var SearchBar = React.createClass({
  render: function() {
    var classes = 'searchbar ';
    return (
      <input type='text' className={classes}></input>
    );
  }
});

var UnderMenu = React.createClass({
  render: function() {
    return (
      <div>
        <h1>HelloHello</h1>
        <SearchBar />
      </div>
    );
  }
});

module.exports = UnderMenu;
