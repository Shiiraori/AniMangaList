import React, { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from '../../../firebase';
import { useNavigate } from "react-router-dom";


import { toast } from 'react-toastify';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
  doc,
  orderBy,
  query
} from "firebase/firestore";

//component edit
import NovelEdit from './NovelEdit';

const NovelList = () => {
  const [novel, setNovel] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // read
        const unsubscribe = onSnapshot(
          query(
          collection(db, `users/${auth.currentUser.displayName}/novel`),
          orderBy("date", "desc")),
          (snapshot) => {
            setNovel(
              snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              })
            );
          }
        );

        return () => unsubscribe();
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

    // delete a novel using the firebase.delete function
    const handleDelete = async (id) => {
      try {
        await deleteDoc(doc(db, `users/${auth.currentUser.displayName}/novel`, id));
        toast.success("Novel deleted successfully")
      } 
      

      catch (error) {
        console.log(error);
      }
    };
  

    return (
      <div className="d-flex justify-content-center">
        <table className="table table-striped">
          <thead>
            <tr className="text-center">
              <th>Novel Name</th>
              <th>Novel Description</th>
              <th>Novel Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {novel.map((novel) => (
              <tr key={novel.id}>
                <td>{novel.NovelName}</td>
                <td>{novel.NovelDescription}</td>
                <td>{novel.NovelRating}</td>
                <td>
                  
                  <div className="d-flex justify-content-center">
                    <NovelEdit novel={novel} />
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(novel.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    
};

export default NovelList;