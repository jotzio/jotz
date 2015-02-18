var React = require('react');

var BlockMenu = React.createClass({
  render: function(){
    return (
      <select defaultValue="javascript" onChange={this.props.changeLanguage}>
        <option value="javascript">JavaScript</option>
        <option value="text">Text</option>
        <option value="coffee">CoffeeScript</option>
        <option value="sass">SASS</option>
        <option value="css">CSS</option>
        <option value="jsx">JSX</option>
        <option value="html">HTML</option>
        <option value="json">JSON</option>
        <option value="markdown">Markdown</option>

      </select>
    );
  }
});

module.exports = BlockMenu;
