import { NextResponse } from 'next/server'
import { Movie } from '../../../../models/movie'
import { db } from '../../../../utils/firebase'
import { collection, getDocs } from 'firebase/firestore/lite'

const moviesCol = collection(db, 'movie')

export async function GET(request: Request) {
  const movieSnapshot = await getDocs(moviesCol)
  const movieList = movieSnapshot.docs.map((doc) => doc.data())
  const movies = movieList as Movie[]
  return NextResponse.json(movies)
}

export async function POST(request: Request) {
  return NextResponse.json({ message: 'Hedddllo World' })
}
