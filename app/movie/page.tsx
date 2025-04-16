'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

// Define Movie type
interface Movie {
  id: number;
  title?: string;
  original_name?: string;
  poster_path: string;
  overview: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: session } = useSession();

  const handleCloseDescription = () => {
    setSelectedMovie(null);
    setDialogOpen(false);
  };

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     if (session?.user) {
  //       try {
  //         const response = await fetch('/api/movie');
  //         if (!response.ok) {
  //           throw new Error(`Error: ${response.status}`);
  //         }
  //         const data = await response.json();
  //         setMovies(data.results);
  //       } catch (error) {
  //         console.error('Failed to fetch movies:', error);
  //       }
  //     } else {
  //       setMovies([]);
  //     }
  //   };

  //   fetchMovies();
  // }, [session]);

  function MovieCard({ movie }: { movie: Movie }) {
    const handleShowDescription = () => {
      setSelectedMovie(movie);
      setDialogOpen(true);
    };

    return (
      <Card className='group cursor-pointer p-2 mt-4 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
        <CardContent className='p-1'>
          <div className='overflow-hidden rounded-md'>
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title || movie.original_name || 'Movie poster'}
              width={300}
              height={450}
              className='object-cover w-full h-96'
            />
          </div>
          <div className='p-2'>
            <h3 className='text-lg font-semibold'>{movie.title || movie.original_name}</h3>
            <div className='flex items-center justify-center'>
              <Button
                variant='default'
                onClick={handleShowDescription}
                className='mt-2 w-24 h-10 bg-black text-white hover:bg-red-700'
              >
                詳細
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <main>
      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4'>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='flex items-center justify-between'>
              <span>{selectedMovie?.title || selectedMovie?.original_name}</span>
              <Button
                variant='ghost'
                size='icon'
                onClick={handleCloseDescription}
                className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100'
              >
                <X className='h-4 w-4' />
                <span className='sr-only'>Close</span>
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className='py-4'>
            <p className='text-sm text-gray-600'>{selectedMovie?.overview}</p>
          </div>
          <DialogFooter>
            <Button onClick={handleCloseDescription}>閉じる</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
