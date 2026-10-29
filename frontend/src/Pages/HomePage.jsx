import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Navbar from "../Components/Navbar";
import RateLimitedUI from "../Components/RateLimitedUI";
import NoteCard from "../Components/NoteCard";
import NotesNotFound from "../Components/NotesNotFound";


const HomePage = () => {
      const [isRateLimited, setIsRateLimited] = useState(false);
      const [notes, setNotes] = useState([]);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
            const fetchNotes = async () => {
                  try {
                        const res = await api.get("/notes");

                        if (Array.isArray(res.data.note)) {
                              setNotes(res.data.note);
                        } else {
                              console.error("Unexpected backend response:", res.data);
                              toast.error("The server returned an unexpected notes format.");
                              return;
                        }

                        setIsRateLimited(false);
                  } catch (error) {

                        if (error.response.status === 429) {
                              setIsRateLimited(true);
                              return;
                        }
                  } finally {
                        setIsLoading(false);
                  }
            };

            fetchNotes();
      }, []);

      return (
            <div className="min-h-screen">
                  <Navbar />

                  {isRateLimited && <RateLimitedUI />}

                  <main className="max-w-7xl mx-auto p-4 mt-6">
                        {isLoading && (
                              <div className="text-center text-primary py-10 font-semibold">
                                    Loading notes...
                              </div>
                        )}

                        {!isLoading && !isRateLimited && notes.length > 0 && (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {notes.map((note) => (
                                         <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                                    ))}
                              </div>
                        )}

                        {!isLoading && !isRateLimited && notes.length === 0 && (
                              <NotesNotFound />
                        )}
                  </main>
            </div>
      );
};

export default HomePage;

