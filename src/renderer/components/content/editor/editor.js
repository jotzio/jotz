var React = require('react/addons');
var _ = require('underscore');
var actionCreator = require('../../../actions/action_creator');
var NoteBlock = require('./note_block');
var NotebookSelector = require('./notebook_selector');
var NotebookCreator = require('./notebook_creator');
var Note = require('../../../stores/note');

/*
 Contains functions for each note.
 Renders NoteBlocks which are stored together in an array as a note.
 */

var getNewNote = function(note) {
  //already json
  note = note || new Note();
  return {
    note: note.toJSON(),
    noteModel: note
  };
};

var Editor = React.createClass({

  getInitialState: function() {
    var newState = { showNotebookCreator: false };
    return _.extend(newState, getNewNote(this.props.note));
  },

  // TODO: Try componentWillUpdate instead of mount (call getNewNote within the event listener)
  componentWillUpdate: function() {
    this.props.notes.on('change', function(model) {
      this.setState({
        note: model.toJSON(),
        noteModel: model
      });
    }, this);
    this.props.notebooks.on('add', function(notebook) {
      console.log('updating notes notebook', notebook.toJSON());
      this.updateNotebook(notebook.toJSON());
    }, this);
  },

  componentWillUnmount: function() {
    this.props.notes.off(null, null, this);
    this.props.notebooks.off(null, null, this);

    var model = this.state.noteModel.set(this.state.note);
    var diff = model.changedAttributes();
    for (var attr in diff) {
      if (attr !== 'updatedAt') {
        actionCreator.checkForSave({
          note: model
        });
        break;
      }
    }
  },

  updateTitle: function(event) {
    var newState = React.addons.update(this.state, {
      note: {
        title: { $set: event.target.value }
      }
    });
    this.setState(newState);
  },

  toggleNotebookCreator: function() {
    this.setState({ showNotebookCreator: !this.state.showNotebookCreator });
  },

  updateNotebook: function(notebook) {
    var newState = React.addons.update(this.state, {
      note: {
        notebook: {
          notebookTitle: { $set: notebook.title },
          _id: { $set: notebook._id }
        }
      }
    });
    this.setState(newState);
  },

  createBlock: function() {
    var newState = React.addons.update(this.state, {
      note: {
        blocks: {
          $push: [ { "content": "", "language": "text" } ]
        }
      }
    });
    this.setState(newState);
  },

  updateBlock: function(block) {
    var newState = React.addons.update(this.state, {
      note: {
        blocks: {
          $splice: [[block.index, 1, block.update]]
        }
      }
    });
    this.setState(newState);
  },

  deleteBlock: function(index) {
    var newState = React.addons.update(this.state, {
      note: {
        blocks: {
          $splice: [[index, 1]]
        }
      }
    });
    this.setState(newState);
  },

  makeGist: function(blockIndex) {
    var payload = {
      block: this.state.note.blocks[blockIndex],
      note: this.state.noteModel.set(this.state.note),
      blockIdx: blockIndex
    };
    actionCreator.makeGist(payload);
  },

  saveNote: function() {
    var model = this.state.noteModel.set(this.state.note);
    actionCreator.saveNote(model);
  },


  deleteNote: function() {
    actionCreator.destroyNote(this.state.noteModel);
    this.closeEditor();
  },

  closeEditor: function() {
    this.props.changeNote('Notes');
  },

  renderNbSelector: function() {
    if (this.state.showNotebookCreator) {
      return (
        <NotebookCreator
          toggleNotebookCreator={this.toggleNotebookCreator}
        />);
    } else {
      return (
      <NotebookSelector
        updateNotebook={this.updateNotebook}
        toggleNotebookCreator={this.toggleNotebookCreator}
        notebooks={this.props.notebooks}
        notebookId={this.state.note.notebook._id}
      />);
    }
  },

  renderBlock: function(block, index) {
    return (
      <NoteBlock
        noteExists={this.state.note && this.state.note._id}
        text={block.content}
        language={block.language}
        blockIndex={index}
        blockGistUrl={block.gistUrl}
        blockGistId={block.gistId}
        updateBlock={this.updateBlock}
        deleteBlock={_.partial(this.deleteBlock, index)}
        makeGist={this.makeGist}
      />
    );
  },

  renderBlocks: function() {
    return this.state.note.blocks.map(this.renderBlock);
  },

  render: function() {
    var deleteBtn = null;
    var noteTitle = '';
    if (this.state.note && this.state.note._id) {
      deleteBtn = <button className="btn" onClick={this.deleteNote}>Delete</button>;
      noteTitle = this.state.note.title;
    }
    return (
      <div className='ace-editor-container'>
        {this.renderNbSelector()}
        <div className="editor-top-bar">
          <input
            className='editor-note-title'
            type='text'
            onChange={this.updateTitle}
            placeholder='Note title'
            defaultValue={noteTitle}
          />
          <button className="btn editor-new-block" onClick={this.createBlock}>New Block</button>
        </div>
        {this.renderBlocks()}
        <div className="editor-actions">
          <button className="btn" onClick={this.saveNote}>Save</button>
          <button className="btn" onClick={this.closeEditor}>Close Note</button>
          {deleteBtn}
        </div>
      </div>
    );
  }
});

module.exports = Editor;
