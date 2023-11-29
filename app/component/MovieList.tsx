import { useEffect, useState } from "react";
import { Movie } from "../type/movie";
import { db } from "../utils/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("api/firebase/movie");
      const data = await response.json();
      console.log(data);

      setMovies(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>投稿一覧</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            {/* <p>{movie.release_date}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
