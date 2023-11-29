import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import axios from "axios";

import { useEffect, useState } from "react";
import { Movie } from "../../../type/movie";
import { db } from "../../../utils/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const moviesCol = collection(db, "movie");

export async function GET(request: Request) {
  const movieSnapshot = await getDocs(moviesCol);
  const movieList = movieSnapshot.docs.map((doc) => doc.data());
  const movies = movieList as Movie[];
  return NextResponse.json(movies);
}

// Handles POST requests to /api
export async function POST(request: Request) {
  // ...
  return NextResponse.json({ message: "Hedddllo World" });
}
