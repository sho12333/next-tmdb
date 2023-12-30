import { Movie } from '../../../utils/data/movie'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import axios from 'axios'

const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`

export async function GET(request: Request) {
  const response = await axios.get(apiUrl)
  return NextResponse.json(response.data)
}

// Handles POST requests to /api
export async function POST(request: Request) {
  // ...
  return NextResponse.json({ message: 'Hedddllo World' })
}
