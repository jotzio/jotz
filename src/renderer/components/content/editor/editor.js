var React = require('react/addons');
var _ = require('underscore');
var actionCreator = require('../../../actions/action_creator');
var NoteBlock = require('./note_block');

/*
 Contains functions for each note.
 Renders NoteBlocks which are stored together in an array as a note.
 TODO: change title h3 to input and add state callback to update note
 TODO: add note deletion
 */


var Editor = React.createClass({
  //newBlock and updateBlock = self explanatory
  //Be careful with changing props, can wipe noteblocks if blocks prop is messed with
  //Everything is Asynchronous, and using replaceState will wipe all blocks, deleting the note

  getInitialState: function() {
    return {
      changed: false
    };
  },

  componentDidMount: function() {
    this.props.note.on('all', this.updateComp, this);
  },

  componentWillUnmount: function() {
    actionCreator.checkForSave({
      note: this.props.note,
      changed: this.state.changed
    });
    this.props.note.off(null, null, this);
  },

  updateComp: function() {
    this.forceUpdate();
  },

  createBlock: function() {
    actionCreator.createBlock();
    this.setState({
      changed: true
    });
  },

  updateBlock: function(blockData) {
    actionCreator.updateBlock(blockData);
    this.setState({
      changed: true
    });
  },

  makeGist: function(blockIndex) {
    actionCreator.makeGist(this.props.note.get('blocks')[blockIndex]);
  },

  //flux activity here, props is sent (not changed)
  //via dispatch to update store
  saveNote: function() {
    actionCreator.saveNote(this.props.note);
  },

  closeEditor: function() {
    this.props.swapView('Notes');
  },

  newBlock: function(block, index) {
    return (
      <NoteBlock
        text={block.content}
        language={block.language}
        blockIndex={index}
        updateBlock={this.updateBlock}
        makeGist={this.makeGist}
      />
    );
  },

  //Called in render, this reads the blocks data and creates NoteBLocks,
  //NoteBLock appends text/value to ace editor
  renderBlocks: function() {
    return this.props.note.get('blocks').map(this.newBlock);
  },

  render: function() {
    return (
      <div className='ace-editor-container'>
        <h3>{this.props.note.get('title')}</h3>
        <button onClick={this.createBlock}>New Block</button>
        {this.renderBlocks()}
        <button onClick={this.saveNote}>Save</button>
        <button onClick={this.closeEditor}>Close Note</button>
      </div>
    );
  }
});

module.exports = Editor;
