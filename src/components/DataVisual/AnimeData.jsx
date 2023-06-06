import React, { useState, useEffect, useRef } from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { Chart } from 'chart.js/auto';


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


const AnimeList = () => {
  const [anime, setAnime] = useState([]);
  const navigate = useNavigate();
  const chartRef = useRef(null); // reference to the chart canvas element

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // read
        const unsubscribe = onSnapshot(
          query(
            collection(db, `users/${auth.currentUser.uid}/anime`),
            orderBy("date", "desc")),
          (snapshot) => {
            setAnime(snapshot.docs.map((doc) => {return { id: doc.id, ...doc.data() };
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

  useEffect(() => {
    if (anime.length > 0) {
      // Count the number of anime based on their ratings
      const ratingsCount = {};
      anime.forEach((anime) => {
        const rating = anime.AnimeRating;
        ratingsCount[rating] = (ratingsCount[rating] || 0) + 1;
      });

      // Chart configuration
      const chartConfig = {
        type: 'bar',
        data: {
          labels: Object.keys(ratingsCount),
          datasets: [
            {
              label: 'Anime Ratings',
              data: Object.values(ratingsCount),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                display: true
              }
            }
          }
        }
      };

      // Create the chart
      const chart = new Chart(chartRef.current, chartConfig);
      
      // Cleanup chart on component unmount
      return () => {
        chart.destroy();
      };
    }
  }, [anime]);


  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  )
}

export default AnimeList;
