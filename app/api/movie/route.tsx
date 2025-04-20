import { NextResponse } from 'next/server';
import axios from 'axios';
import { Movie } from '@/models/movies/movie';

const apiUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}&language=ja-JP`;

export async function GET(request: Request) {
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMBD_API_KEY}`,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
