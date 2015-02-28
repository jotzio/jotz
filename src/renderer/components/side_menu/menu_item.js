var React = require('react');

var MenuItem = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.swapView(this.props.category);
  },

  render: function() {
    var className = 'main-nav-item ';
    if (this.props.active) {
      className += 'active ';
    }
    var titleClassName = this.props.category + ' main-nav-title';

    return (
      <li className={className} onClick={this.handleClick}>
        <img data-src={this.props.icon} className='iconic iconic-md main-nav-icon' />
        <p className={titleClassName}>{this.props.category}</p>
      </li>
    );
  }
});

module.exports = MenuItem;
