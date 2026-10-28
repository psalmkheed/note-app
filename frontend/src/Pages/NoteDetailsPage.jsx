import { useState } from "react";
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";

const NoteDetailsPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {

    const fetchNotes = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data.note);
        // console.log(res.data.note)
      } catch (error) {
        console.log("Error fetching note", error);
        toast.error("Failed to fetch the note")
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();

  }, [id])

  const handleDelete = async () => {

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  }
  const handleSubmit = async () => {

    if (!note.title || !note.content) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note Updated successfully")
      navigate("/")
    } catch (error) {
      console.log("Error updating note", error);
      toast.error("Failed to update the note")
    } finally {
      setSaving(false)
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center"><LoaderIcon className="animate-spin w-10 h-10" /></div>
    )
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-2xl mx-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
            </Link>
            <button className="btn btn-error btn-outline" onClick={handleDelete} >
              <Trash2Icon className="size-5" />
            </button>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex flex-col gap-2 mb-4">
              <label className="label">
                <span className="label-text">
                  Title
                </span>
              </label>
              <input type="text"
                placeholder="Note Title"
                className="input input-bordered w-full"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2 mb-4 w-full">
              <label className="label">
                <span className="label-text">
                  Content
                </span>
              </label>
              <textarea
                placeholder="Write your note here..."
                className="textarea textarea-bordered h-32 w-full p-4"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>

            <div className="card-actions justify-end">
              <button type="submit" onClick={handleSubmit} className="btn btn-primary" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default NoteDetailsPage