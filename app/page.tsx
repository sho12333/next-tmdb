"use client";

import Image from "next/image";
import HeaderBar from "./layout/Header";
import {
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import { Movie } from "./utils/data/movie";
import { PlayArrow, Add, Close } from "@mui/icons-material";
import { AuthProvider } from "./utils/auth/AuthContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [rank, setRank] = useState(0);

  const handleCloseDescription = () => {
    setSelectedMovie(null);
    setDialogOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("api/movie");
      const data = await response.json();
      console.log(data);

      setMovies(data.results);
    }
    fetchData();
  }, []);

  function PlayMyListButton() {
    return (
      <div className="flex items-center justify-center space-x-2">
        <button className="flex items-center justify-center w-24 h-10 bg-red-600 text-white rounded-md font-bold text-sm hover:bg-red-700 transition-colors duration-150">
          <PlayArrow className="mr-2" />
          Play
        </button>
        <button className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full font-bold text-sm hover:bg-gray-700 transition-colors duration-150">
          <Add />
        </button>
      </div>
    );
  }

  function MovieCard({ movie }: { movie: Movie }) {
    const handleShowDescription = (movie: Movie) => {
      setSelectedMovie(movie);
      setDialogOpen(true);
    };

    return (
      <Card variant="outlined" className={styles.movie} key={movie.id}>
        <CardContent>
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title || movie.original_name}
            width={300}
            height={300}
            style={{ height: "24rem" }}
            objectFit="cover"
          />
        </CardContent>
        <div className={styles.movieInfo}>
          <h3>{movie.title || movie.original_name}</h3>
          <button onClick={() => handleShowDescription(movie)}>
            Show Description
          </button>
          <PlayMyListButton />
        </div>
      </Card>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <main>
          <HeaderBar />
          <ul>
            <div className={styles.movieList}>
              {movies.map((movie) => (
                <li key={movie.id}>
                  <MovieCard movie={movie} />
                </li>
              ))}
            </div>
          </ul>
          <Dialog open={dialogOpen} onClose={handleCloseDescription}>
            <DialogTitle>
              <div className="flex items-center justify-between">
                <h2>{selectedMovie?.title || selectedMovie?.original_name}</h2>
                <button onClick={handleCloseDescription}>
                  <Close />
                </button>
              </div>
            </DialogTitle>
            <DialogContent>
              <p>{selectedMovie?.overview}</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDescription}>Close</Button>
            </DialogActions>
          </Dialog>
        </main>
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = {
  movieList:
    "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4",
  movie:
    "group cursor-pointer p-2 mt-4 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50",
  movieInfo: "p-2",
  descriptionOverlay:
    "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center",
  description:
    "bg-white p-4 rounded-lg max-w-2xl w-full overflow-y-auto max-h-full",
};
