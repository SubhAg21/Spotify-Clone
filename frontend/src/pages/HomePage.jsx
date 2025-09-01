import React from "react";
import Layout from "./../components/Layout";
import { SongData } from "./../context/Song";
import AlbumItems from "./../components/AlbumItems";
import SongItems from "../components/SongItems";

const HomePage = () => {
  const { songs, albums } = SongData();
  return (
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featued Charts</h1>
        <div className="flex overflow-auto">
          {albums.map((e, i) => (
            <AlbumItems
              key={i}
              image={e.thumbnail.url}
              name={e.title}
              desc={e.description}
              id={e._id}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's Biggest Hits</h1>
        <div className="flex overflow-auto">
          {songs.map((e, i) => (
            <SongItems
              key={i}
              image={e.thumbnail.url}
              name={e.title}
              desc={e.description}
              id={e._id}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
