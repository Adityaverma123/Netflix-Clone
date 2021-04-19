import { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import youtubeApi from "./Youtube";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailer] = useState("");
  const API_KEY = "AIzaSyBKDRzO8IikbMLWhiw6fN7rYdg0EWDdR_Y";
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchdata();
  }, [fetchUrl]);
  const handleClick = async (movie) => {
    console.log(movie);
    if (trailerUrl) {
      setTrailer("");
    } else {
      const response = await youtubeApi.get(
        `/search?key=${API_KEY}&part=snippet&q=${
          movie?.name || movie?.original
        }Netflixtrailer`
      );
      console.log(response);
      const id = response?.data?.items[0]?.id?.videoId;
      setTrailer(id);
      // movieTrailer(movie?.name || "")
      //   .then((url) => {
      //     const urlParam = new URLSearchParams(new URL(url).search);
      //     setTrailer(urlParam.get("v"));
      // })
      // .catch((err) => console.log(err));
    }
  };
  return (
    <div className="row">
      <h2> {title}</h2>
      <div className="row-posts">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row-post ${isLargeRow && "row-postLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            onClick={() => handleClick(movie)}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
