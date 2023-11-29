"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import firebase from "firebase/compat/app";
import MovieList from "../component/MovieList";
import { Movie } from "../type/movie";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     // await db.collection("movie").add({
  //     //   title,
  //     //   release_date: releaseDate,
  //     //   genre,
  //     // });
  //   };
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // set movie title to e.currentTarget.value
    // setMovie(...movie, title: e.currentTarget.value);
    // setMovie((prev) => [...prev, { title: e.currentTarget.value }]);
  };
  const handleChangeReleaseDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setReleaseDate(e.currentTarget.value);
  };

  //   useEffect(() => {
  //     const fetchMovies = async () => {
  //       const moviesData = await getMovies();
  //       setMovies(moviesData);
  //     };

  //     fetchMovies();
  //   }, []);

  return (
    <div>
      <h2>新規投稿</h2>
      <form>
        <div>
          <label>タイトル</label>
          <input
            name="title"
            type="text"
            required
            onChange={handleChangeTitle}
          />
        </div>
        <div>
          <label>リリース日</label>
          <input
            name="release_date"
            type="text"
            required
            onChange={handleChangeReleaseDate}
          />
        </div>
        <button type="submit">追加</button>
      </form>

      <MovieList />
    </div>
  );
}
