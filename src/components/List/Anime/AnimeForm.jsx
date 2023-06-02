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

const AnimeForm = () => {
  const [animeName, setAnimeName] = useState('');
  const [animeDescription, setAnimeDescription] = useState('');
  const [animeRating, setAnimeRating] = useState('');
  const [showModal, setShowModal] = useState(false);



  //add a movie
  const AddAnime = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `users/${auth.currentUser.displayName}/anime`), {
        AnimeName: animeName,
        AnimeDescription: animeDescription,
        AnimeRating: animeRating,
        date: Date.now(),
      });
      setAnimeName('');
      setAnimeDescription('');
      setAnimeRating('');
      setShowModal(false);

      toast.success('Added Anime')
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
        Add Anime
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
              <h5 className="modal-title">Add Anime</h5>
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
              <form onSubmit={AddAnime}>
                <div className="form-group">
                <label htmlFor="mn" className="form-label">Anime Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mn"
                    placeholder="Anime Name"
                    required
                    value={animeName}
                    onChange={(e) => setAnimeName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="md" className="form-label">Anime Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="md"
                    placeholder="Anime Description"
                    required
                    value={animeDescription}
                    onChange={(e) => setAnimeDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                <label htmlFor="rate" className="form-label">Rate the Anime</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    id="rate"
                    className="form-control"
                    placeholder="1-5"
                    required
                    value={animeRating}
                    onChange={(e) => setAnimeRating(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Add Anime
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

export default AnimeForm;
