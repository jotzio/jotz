var newNote = function() {
  return {
    title: '',
    blocks: [{
      language: 'text',
      content: ''
    }],
    notebook: {
      notebookTitle: ''
    }
  }
};

module.exports = newNote;