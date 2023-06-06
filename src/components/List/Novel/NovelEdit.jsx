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

const NovelEdit =({ novel }) => {
    console.log(novel.id)
    console.log(novel.NovelName)
    const [novelName, setNovelName] = useState(novel.NovelName)
    const [novelDescription, setNovelDescription] = useState(novel.NovelDescription)
    const [novelRating, setNovelRating] = useState(novel.NovelRating)

    //edit function here
    const handleUpdate = async () => {
      try {
        const novelRef = doc(
          db,
          `users/${auth.currentUser.uid}/novel`,
          novel.id
        );
    
        await updateDoc(novelRef, {
          NovelName: novelName,
          NovelDescription: novelDescription,
          NovelRating: novelRating,
        });
    
        toast.success('Updated Novel');
        closeModal();
      } catch (error) {
        console.log(error);
      }
    };
    
    const closeModal = () => {
      const modal = document.getElementById(`id${novel.id}`);
      const backdrop = document.getElementsByClassName('modal-backdrop')[0];
      
      modal.classList.remove('show');
      modal.style.display = 'none';
      backdrop.parentNode.removeChild(backdrop);
    };
    
    
    // toast.success('Updated Novel')
    return (
        <div>
          <button
            type="button"
            className="btn btn-info"
            data-toggle="modal"
            data-target={`#id${novel.id}`}
          >
            Edit
          </button>
      
          <div className="modal" id={`id${novel.id}`}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Novel</h4>
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
                      placeholder="Novel Name"
                      required
                      value={novelName}
                      onChange={(e) => setNovelName(e.target.value)}
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
                      value={novelDescription}
                      onChange={(e) => setNovelDescription(e.target.value)}
                    />
                  </div>
      
                  <div className="form-group">
                    <label htmlFor="rate" className="form-label">
                      Rate
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      id="rate"
                      className="form-control"
                      placeholder="1-5"
                      required
                      value={novelRating}
                      onChange={(e) => setNovelRating(e.target.value)}
                    />
                  </div>
                </div>
      
                <div className="modal-footer">
                <button type="submit" className="btn btn-primary" onClick={handleUpdate}>
                Update Novel
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




export default NovelEdit;