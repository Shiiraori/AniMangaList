import React, { useState } from 'react'
import { toast } from 'react-toastify';
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

const AnimeEdit =({ anime }) => {
    console.log(anime.id)
    console.log(anime.AnimeName)
    const [animeName, setAnimeName] = useState(anime.AnimeName)
    const [animeDescription, setAnimeDescription] = useState(anime.AnimeDescription)
    const [animeRating, setAnimeRating] = useState(anime.AnimeRating)

    //edit function here
    const handleUpdate = async () => {
      try {
        const animeRef = doc(
          db,
          `users/${auth.currentUser.uid}/anime`,
          anime.id
        );
    
        await updateDoc(animeRef, {
          AnimeName: animeName,
          AnimeDescription: animeDescription,
          AnimeRating: animeRating,
        });
    
        toast.success('Updated Anime');
        closeModal();
      } catch (error) {
        console.log(error);
      }
    };
    
    const closeModal = () => {
      const modal = document.getElementById(`id${anime.id}`);
      const backdrop = document.getElementsByClassName('modal-backdrop')[0];
      
      modal.classList.remove('show');
      modal.style.display = 'none';
      backdrop.parentNode.removeChild(backdrop);
    };
    
    
    // toast.success('Updated Anime')
    return (
        <div>
          <button
            type="button"
            className="btn btn-info"
            data-toggle="modal"
            data-target={`#id${anime.id}`}
          >
            Edit
          </button>
      
          <div className="modal" id={`id${anime.id}`}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Anime</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
      
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="mn" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mn"
                      placeholder="Name"
                      required
                      value={animeName}
                      onChange={(e) => setAnimeName(e.target.value)}
                    />
                  </div>
      
                  <div className="form-group">
                    <label htmlFor="md" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="md"
                      placeholder="Description"
                      required
                      value={animeDescription}
                      onChange={(e) => setAnimeDescription(e.target.value)}
                    />
                  </div>
      
                  <div className="form-group">
                    <label htmlFor="rate" className="form-label">
                      Anime
                    </label>
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
                </div>
      
                <div className="modal-footer">
                <button type="submit" className="btn btn-primary" onClick={handleUpdate}>
                Update Anime
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
              </div>
            </div>
          </div>
        </div>
      );
}




export default AnimeEdit;