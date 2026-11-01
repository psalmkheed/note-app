import Note from '../models/Note.js';
import invalidMongooseId from '../utils/invalidMongooseId.js'
import User from '../models/User.js'

class NoteController
{
      async createNote(req, res) {
            try {
                  
                  const { title, content } = req.body;
                  if(Object.keys(req.body).length === 0) {
                        return res.status(400).json({
                              success: false,
                              message: "Request body is empty"
                        })
                  }

                  if(!title || !content) {
                        return res.status(400).json({
                              success: false,
                              message: "All fields are required"
                        })
                  }

                  const user = req.user;

                  if (!user) {
                        return res.status(404).json({
                              message: "User not found",
                              status: "error"
                        });
                  }

                  const note = await Note.create({
                        title, 
                        content,
                        user: user._id
                  })

                  user.notes.push(note._id);
                  await user.save();

                  return res.status(201).json({
                        success: true,
                        message: "Note created successfully",
                        note
                  })

                  

            } catch(error){
                  return res.status(500).json({
                        message: "Internal server error",
                        error: error.message
                  })
            }
      }

      async getAllNotes(req, res) {
            try {

                  const note = await Note.find().sort({ createdAt: -1 });

                  if(note.length === 0){
                        return res.status(404).json({
                              success: false,
                              message: "No notes found"
                        })
                  }
                  return res.status(200).json({
                        success: true,
                        message: "Notes fetched successfully",
                        note
                  })

            } catch(error){
                   res.status(500).json({
                        message: "Internal server error",
                        error: error.message
                  })
            }
      }

      async getUserNotes(req, res) {
    try {
        const notes = await Note.find({
            user: req.user._id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "User notes retrieved successfully",
            note: notes
        });

    } catch (error) {
        console.error("Fetch user notes error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

      async getNoteById(req, res){
            try {

                  const { id } = req.params;

                   if (invalidMongooseId(id)) {
                        return res.status(400).json({
                              success: false,
                              message: "Invalid note ID"
                        });
                  }

                  const note = await Note.findById(id);

                  if(!note){
                        return res.status(404).json({
                              success: false,
                              message: "Note not found"
                        })
                  }
                  return res.status(200).json({
                        success: true,
                        message: "Note fetched successfully",
                        note
                  })

            } catch(error){
                  res.status(500).json({
                        message: "Internal server error",
                        error: error.message
                  })
            }
      }

      async updateNote(req, res) {
            try {
                  const { id } = req.params;

                   if (invalidMongooseId(id)) {
                        return res.status(400).json({
                              success: false,
                              message: "Invalid note ID"
                        });
                  }

                  const { title, content } = req.body;

                  const note = await Note.findByIdAndUpdate(id, 
                        { title, content }, 
                        { returnDocument: 'after', validate: true }
            );

                  if(!note){
                        return res.status(404).json({
                              success: false,
                              message: "Note not found"
                        })
                  }
                  return res.status(200).json({
                        success: true,
                        message: "Note updated successfully",
                        note
                  })

            } catch(error){
                  res.status(500).json({
                        message: "Internal server error",
                        error: error.message
                  })
            }
      }

      async deleteNote(req, res) {
            try {
            const { id } = req.params;

            if (invalidMongooseId(id)) {
                  return res.status(400).json({
                        success: false,
                        message: "Invalid note ID"
                  });
            }


            const note = await Note.findOne({
                  _id: id,
                  user: req.user._id
            });

            if (!note) {
                  return res.status(404).json({
                        success: false,
                        message: "Note not found"
                  });
            }

            await Note.findByIdAndDelete(id);

            await User.findByIdAndUpdate(
                  req.user._id,
                  {
                        $pull: { notes: note._id }
                  }
            );

            return res.status(200).json({
                  success: true,
                  message: "Note deleted successfully"
            });

            } catch (error) {
            console.error("Delete note error:", error);

            return res.status(500).json({
                  success: false,
                  message: "Internal server error"
            });
            }

}

}

export default new NoteController;