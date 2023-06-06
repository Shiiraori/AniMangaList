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

const NovelForm = () => {
  const [novelName, setNovelName] = useState('');
  const [novelDescription, setNovelDescription] = useState('');
  const [novelRating, setNovelRating] = useState('');
  const [showModal, setShowModal] = useState(false);



  //add a movie
  const AddNovel = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `users/${auth.currentUser.uid}/novel`), {
        NovelName: novelName,
        NovelDescription: novelDescription,
        NovelRating: novelRating,
        date: Date.now(),
      });
      setNovelName('');
      setNovelDescription('');
      setNovelRating('');
      setShowModal(false);

      toast.success('Added Novel')
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
        Add Novel
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
              <h5 className="modal-title">Add Novel</h5>
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
              <form onSubmit={AddNovel}>
                <div className="form-group">
                <label htmlFor="mn" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mn"
                    placeholder="Name"
                    required
                    value={novelName}
                    onChange={(e) => setNovelName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="md" className="form-label">Description</label>
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
                <label htmlFor="rate" className="form-label">Novel</label>
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
                <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Add Novel
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
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

export default NovelForm;
