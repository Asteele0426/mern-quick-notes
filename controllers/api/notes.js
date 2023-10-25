const Note = require('../../models/note');

module.exports = {
    index,
    create,
    delete: deleteNote,
};

async function deleteNote(req, res) {
    try {
        const noteID = req.params.noteID;

        await Note.findByIdAndDelete(noteID);

        res.json({ message: 'Note deleted successfully' });

    } catch (error) {
        console.error('Error deleting note', error);
        res.status(500).json({ error: 'Failed to delete a note' });
    }
}

async function create(req, res) {
    try {
        const note = req.body;
        const newNote = await Note.create(note);
        res.json(newNote);
    } catch (error) {
        console.error('Error creating note', error);
        res.status(500).json({ error: 'Failed to create a new note' });
    }
}


async function index(req, res) {
    try {
        const userID = req.user._id;
        const notes = await Note.find({ user: userID });
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes', error);
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
}