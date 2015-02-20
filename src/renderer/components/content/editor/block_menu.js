var React = require('react');

/*
  note block contextual menu
  TODO: change theme?
 */

var BlockMenu = React.createClass({
  render: function() {
    return (
      <select defaultValue={this.props.language || "plain_text"} onChange={this.props.changeLanguage}>
        <option value="plain_text">Text</option>
        <option value="javascript">JavaScript</option>
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
