import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { useEffect } from "react";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return;
    }

    setLoading(true)

    try {
      await api.post(`/notes/${id}`, {
        title,
        content
      })

      toast.success("Note created successfully");

      navigate("/dashboard");
    } catch (error) {
      console.log("Error creating note", error)

      if (error.response.status === 429) {
        toast.error("Slow down! You're creating note too fast", {
          duration: 4000,
          icon: "💀"
        });
      } else {
        toast.error("Failed to create note")
      }

    } finally {
      setLoading(false);
    }

  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/dashboard"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl">
                Create New Note
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 mb-4">
                  <label className="label">
                    <span className="label-text">
                      Title
                    </span>
                  </label>
                  <input type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage