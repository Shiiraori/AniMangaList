import React from 'react';
import MangaForm from './List/Manga/MangaForm';
import MangaList from './List/Manga/MangaList';
import CustomNav from './CustomNav/CustomNav';

export default function Manga() {
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
          <div>
            <MangaForm />
            <MangaList /> 
          </div>
        </div>
      </div>
    </div>
  );
}
