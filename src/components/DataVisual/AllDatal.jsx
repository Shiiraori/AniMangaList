import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { Chart } from 'chart.js/auto';

const AllData = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const animeCollectionRef = collection(
        db,
        `users/${auth.currentUser.uid}/anime`
      );
      const mangaCollectionRef = collection(
        db,
        `users/${auth.currentUser.uid}/manga`
      );
      const novelCollectionRef = collection(
        db,
        `users/${auth.currentUser.uid}/novel`
      );

      let animeData = [];
      let mangaData = [];
      let novelData = [];

      const [animeSnapshot, mangaSnapshot, novelSnapshot] = await Promise.all([
        onSnapshot(animeCollectionRef, (snapshot) => {
          animeData = snapshot.docs.map((doc) => doc.data());
          updateChart(animeData, mangaData, novelData);
        }),
        onSnapshot(mangaCollectionRef, (snapshot) => {
          mangaData = snapshot.docs.map((doc) => doc.data());
          updateChart(animeData, mangaData, novelData);
        }),
        onSnapshot(novelCollectionRef, (snapshot) => {
          novelData = snapshot.docs.map((doc) => doc.data());
          updateChart(animeData, mangaData, novelData);
        })
      ]);

      return () => {
        // Unsubscribe from the Firestore snapshot listeners when component unmounts
        animeSnapshot();
        mangaSnapshot();
        novelSnapshot();
      };
    };

    fetchData();
  }, []);

  const updateChart = (animeData, mangaData, novelData) => {
    const totalAnime = animeData.length;
    const totalManga = mangaData.length;
    const totalNovel = novelData.length;

    const chartConfig = {
      type: 'bar',
      data: {
        labels: ['Anime', 'Manga', 'Light Novel'],
        datasets: [
          {
            label: 'All',
            data: [totalAnime, totalManga, totalNovel],
            backgroundColor: [
              'rgba(54, 162, 235, 0.5)', // Anime color
              'rgba(255, 99, 132, 0.5)', // Manga color
              'rgba(75, 192, 192, 0.5)' // Novel color
            ],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const chartElement = chartRef.current;

    if (chartElement) {
      if (chartElement.chart) {
        chartElement.chart.destroy();
      }

      chartElement.chart = new Chart(chartElement.getContext('2d'), chartConfig);
    }
  };

  return (
    <div>
  <canvas ref={chartRef} width="400" height="100" style={{ display: 'block' }}/>
  </div>
  );
};

export default AllData;
