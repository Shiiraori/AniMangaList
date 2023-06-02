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
import MangaEdit from './MangaEdit';

const MangaList = () => {
  const [manga, setManga] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // read
        const unsubscribe = onSnapshot(
          query(
          collection(db, `users/${auth.currentUser.displayName}/manga`),
          orderBy("date", "desc")),
          (snapshot) => {
            setManga(
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

    // delete a manga using the firebase.delete function
    const handleDelete = async (id) => {
      try {
        await deleteDoc(doc(db, `users/${auth.currentUser.displayName}/manga`, id));
        toast.success("Manga deleted successfully")
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
              <th>Manga Name</th>
              <th>Manga Description</th>
              <th>Manga Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {manga.map((manga) => (
              <tr key={manga.id}>
                <td>{manga.MangaName}</td>
                <td>{manga.MangaDescription}</td>
                <td>{manga.MangaRating}</td>
                <td>
                  
                  <div className="d-flex justify-content-center">
                    <MangaEdit manga={manga} />
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(manga.id)}
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

export default MangaList;