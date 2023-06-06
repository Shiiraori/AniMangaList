import React from 'react';
import CustomNav from './CustomNav/CustomNav';
import AnimeData from './DataVisual/AnimeData';
import AllData from './DataVisual/AllDatal';
import MangaData from './DataVisual/MangaData';
import LightNovelData from './DataVisual/LightNovelData';

export default function DataVisual() {
  return (
    <div className="container-fluid">
      <div style={{ display: 'flex' }} className="row">
        <div style={{ position: 'fixed', left: '0' }} className="col-md-3 text-decoration-none">
          <CustomNav  
            li={[
              ["Dashboard", "img/dashboard.svg"],
              ["Anime", "img/anime.svg"],
              ["Manga", "img/anya.svg"],
              ["Light Novel", "img/novel.svg"],
              ["Data Visualization", "img/data.svg"]
            ]}
          />
        </div>
        <div><img src="img/AnyaHeh.jpg" alt="Your Image" className="image" style={{ marginLeft: '300px' }} /></div>
        <div style={{ marginTop: '200px', marginLeft: '300px' }} className="col-md-9">
        <div className="container">
        <div>
            <h2>Anime</h2>
              <AnimeData />
        </div>
        <div>
            <h2>Manga</h2>
              <MangaData />
        </div>
        <div>
          <h2>Light Novel</h2><LightNovelData /></div>
        <div>
            <h2>Total</h2>
              <AllData />
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
