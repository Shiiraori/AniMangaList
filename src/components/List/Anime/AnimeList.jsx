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
import AnimeEdit from './AnimeEdit';

const AnimeList = () => {
  const [anime, setAnime] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // read
        const unsubscribe = onSnapshot(
          query(
          collection(db, `users/${auth.currentUser.displayName}/anime`),
          orderBy("date", "desc")),
          (snapshot) => {
            setAnime(
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

    // delete a anime using the firebase.delete function
    const handleDelete = async (id) => {
      try {
        await deleteDoc(doc(db, `users/${auth.currentUser.displayName}/anime`, id));
        toast.success("Anime deleted successfully")
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
              <th>Anime Name</th>
              <th>Anime Description</th>
              <th>Anime Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {anime.map((anime) => (
              <tr key={anime.id}>
                <td>{anime.AnimeName}</td>
                <td>{anime.AnimeDescription}</td>
                <td>{anime.AnimeRating}</td>
                <td>
                  
                  <div className="d-flex justify-content-center">
                    <AnimeEdit anime={anime} />
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(anime.id)}
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

export default AnimeList;