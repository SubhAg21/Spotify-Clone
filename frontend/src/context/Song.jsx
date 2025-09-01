import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "./User";

const Song = createContext();

export const SongData = () => useContext(Song);

export const SongProvider = ({ children }) => {
  const { isAuth } = UserData();

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [song, setSong] = useState([]);
  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState([]);

  const getAllSongs = async () => {
    try {
      const { data } = await axios.get("/api/song/all", {
        withCredentials: true,
      });
      setSongs(data);
      setSelectedSong(data[0]?._id || null);
      setIsPlaying(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllAlbums = async () => {
    try {
      const { data } = await axios.get("/api/song/album/all", {
        withCredentials: true,
      });
      setAlbums(data);
    } catch (error) {
      toast.error("Failed to load albums");
      console.error(
        "Get Albums Error:",
        error?.response?.data || error.message
      );
    }
  };

  const addAlbum = async (formData, setTitle, setDescription, setFile) => {
    try {
      setLoading(true);
      await axios.post("/api/song/album/create", formData, {
        withCredentials: true,
      });
      toast.success("Album added successfully");
      setTitle("");
      setDescription("");
      setFile(null);
      getAllAlbums();
    } catch (error) {
      toast.error("Failed to add album");
      console.error("Add Album Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const addSong = async (
    formData,
    setTitle,
    setDescription,
    setFile,
    setSinger,
    setAlbum
  ) => {
    try {
      setLoading(true);
      await axios.post("/api/song/create", formData, {
        withCredentials: true,
      });
      toast.success("Song added successfully");
      setTitle("");
      setDescription("");
      setSinger("");
      setAlbum("");
      setFile(null);
      getAllSongs();
    } catch (error) {
      toast.error("Failed to add song");
      console.error("Add Song Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const addThumbnail = async (id, formData, setFile) => {
    try {
      setLoading(true);
      await axios.post(`/api/song/${id}`, formData, {
        withCredentials: true,
      });
      toast.success("Thumbnail added successfully");
      setFile(null);
      getAllSongs();
    } catch (error) {
      toast.error("Failed to add thumbnail");
      console.error(
        "Add Thumbnail Error:",
        error?.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteSong = async (id) => {
    try {
      await axios.delete(`/api/song/${id}`, { withCredentials: true });
      toast.success("Song deleted successfully");
      getAllSongs();
    } catch (error) {
      toast.error("Failed to delete song");
      console.error(
        "Delete Song Error:",
        error?.response?.data || error.message
      );
    }
  };

  const fetchSong = async () => {
    try {
      const { data } = await axios.get("/api/song/single/" + selectedSong);
      setSong(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAlbumSong = async (id) => {
    try {
      const { data } = await axios.get("/api/song/album/" + id);
      setAlbumSong(data.songs);
      setAlbumData(data.album);
    } catch (error) {
      console.log(error);
    }
  };

  const nextMusic = () => {
    if (index === songs.length - 1) {
      setIndex(0);
      setSelectedSong(songs[0]?._id || null);
    } else {
      setIndex(index + 1);
      setSelectedSong(songs[index + 1]?._id || null);
    }
  };

  const prevMusic = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setSelectedSong(songs[index - 1]?._id || null);
  };

  useEffect(() => {
    if (isAuth) {
      getAllSongs();
      getAllAlbums();
    }
  }, [isAuth]);

  return (
    <Song.Provider
      value={{
        songs,
        albums,
        loading,
        setSongs,
        addAlbum,
        addSong,
        addThumbnail,
        deleteSong,
        getAllSongs,
        fetchSong,
        song,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        selectedSong,
        nextMusic,
        prevMusic,
        fetchAlbumSong,
        albumSong,
        albumData,
        getAllAlbums,
      }}
    >
      {children}
    </Song.Provider>
  );
};
