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

const MangaEdit =({ manga }) => {
    console.log(manga.id)
    console.log(manga.MangaName)
    const [mangaName, setMangaName] = useState(manga.MangaName)
    const [mangaDescription, setMangaDescription] = useState(manga.MangaDescription)
    const [mangaRating, setMangaRating] = useState(manga.MangaRating)

    //edit function here
    const handleUpdate = async () => {
      try {
        const mangaRef = doc(
          db,
          `users/${auth.currentUser.displayName}/manga`,
          manga.id
        );
    
        await updateDoc(mangaRef, {
          MangaName: mangaName,
          MangaDescription: mangaDescription,
          MangaRating: mangaRating,
        });
    
        toast.success('Updated Manga');
        closeModal();
      } catch (error) {
        console.log(error);
      }
    };
    
    const closeModal = () => {
      const modal = document.getElementById(`id${manga.id}`);
      const backdrop = document.getElementsByClassName('modal-backdrop')[0];
      
      modal.classList.remove('show');
      modal.style.display = 'none';
      backdrop.parentNode.removeChild(backdrop);
    };
    
    
    // toast.success('Updated Manga')
    return (
        <div>
          <button
            type="button"
            className="btn btn-info"
            data-toggle="modal"
            data-target={`#id${manga.id}`}
          >
            Edit
          </button>
      
          <div className="modal" id={`id${manga.id}`}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Manga</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
      
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="mn" className="form-label">
                      Manga Name
                    </label>
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
                    <label htmlFor="md" className="form-label">
                      Manga Description
                    </label>
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
                    <label htmlFor="rate" className="form-label">
                      Rate the Manga
                    </label>
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
                </div>
      
                <div className="modal-footer">
                <button type="submit" className="btn btn-primary" onClick={handleUpdate}>
                Update Manga
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




export default MangaEdit;