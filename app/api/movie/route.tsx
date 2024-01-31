import { NextResponse } from 'next/server';
import axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

export async function GET(request: Request) {
  const response = await axios.get(apiUrl);
  return NextResponse.json(response.data);
}
