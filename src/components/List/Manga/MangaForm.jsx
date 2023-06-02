import React, { useState } from 'react';
import { db, auth } from '../../../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { toast } from 'react-toastify';

const MangaForm = () => {
  const [mangaName, setMangaName] = useState('');
  const [mangaDescription, setMangaDescription] = useState('');
  const [mangaRating, setMangaRating] = useState('');
  const [showModal, setShowModal] = useState(false);



  //add a movie
  const AddManga = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `users/${auth.currentUser.displayName}/manga`), {
        MangaName: mangaName,
        MangaDescription: mangaDescription,
        MangaRating: mangaRating,
        date: Date.now(),
      });
      setMangaName('');
      setMangaDescription('');
      setMangaRating('');
      setShowModal(false);

      toast.success('Added Manga')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
      >
        Add Manga
      </button>
  
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{
          display: showModal ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Manga</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={AddManga}>
                <div className="form-group">
                <label htmlFor="mn" className="form-label">Manga Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mn"
                    placeholder="Manga Name"
                    required
                    value={mangaName}
                    onChange={(e) => setMangaName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="md" className="form-label">Manga Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="md"
                    placeholder="Manga Description"
                    required
                    value={mangaDescription}
                    onChange={(e) => setMangaDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                <label htmlFor="rate" className="form-label">Rate the Manga</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    id="rate"
                    className="form-control"
                    placeholder="1-5"
                    required
                    value={mangaRating}
                    onChange={(e) => setMangaRating(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Add Manga
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default MangaForm;
