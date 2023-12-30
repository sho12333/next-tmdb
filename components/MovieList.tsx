import { useEffect, useState } from 'react'
import { Movie } from '../models/movie'
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material'

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([])
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('api/firebase/movie')
      const data = await response.json()
      setMovies(data)
    }
    fetchData()
  }, [])

  return (
    <div className='flex justify-center items-center'>
      <Paper className='max-w-xl'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>タイトル</TableCell>
              <TableCell>ジャンル</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.genre}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}
