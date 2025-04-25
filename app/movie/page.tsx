'use client';

import { useSession } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, Calendar, Info, SortDesc, ArrowDownUp } from 'lucide-react';
import useSWR from 'swr';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { useMemo, useState } from 'react';

interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

// 映画の型定義
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average?: number;
  release_date?: string;
}

const fetcher = async (url: string): Promise<MovieResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('映画データの取得に失敗しました');
  }
  return res.json();
};

type Checked = DropdownMenuCheckboxItemProps['checked'];

type SortOption = 'popularity' | 'rating' | 'newest' | 'title';

export default function MovieComponent() {
  const { data: session } = useSession();
  const [sortOption, setSortOption] = useState<SortOption>('rating');

  const shouldFetch = !!session?.user;

  const { data, error, isLoading } = useSWR<MovieResponse>(
    shouldFetch ? '/api/movie' : null,
    fetcher,
    {
      revalidateOnMount: true,
    },
  );

  const sortedMovie = useMemo(() => {
    if (!data?.results) return [];

    const movies = [...data.results];

    switch (sortOption) {
      case 'rating':
        return movies.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
      case 'newest':
        return movies.sort(
          (a, b) =>
            new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime(),
        );
      case 'title':
        return movies.sort((a, b) => a.title.localeCompare(b.title));
      case 'popularity':
      default:
        return movies;
    }
  }, [data, sortOption]);

  if (isLoading)
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
      </div>
    );

  if (error)
    return (
      <div className='p-6 text-center border border-red-200 rounded-lg bg-red-50 text-red-600'>
        <Info className='mx-auto mb-2 h-8 w-8' />
        <p>{error.message}</p>
      </div>
    );

  if (!data || !data.results || data.results.length === 0)
    return (
      <div className='p-8 text-center border rounded-lg bg-muted'>
        <p className='text-muted-foreground'>表示する映画がありません</p>
      </div>
    );

  return (
    <div className='container mx-auto py-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold'>今週のトレンド映画</h2>
        <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm'>
                <div className='flex items-center gap-2'>
                  <ArrowDownUp className='h-4 w-4' />
                  並び替え
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 z-50' align='end' forceMount>
              <DropdownMenuLabel>並び替え</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sortOption}
                onValueChange={(value) => setSortOption(value as SortOption)}
              >
                <DropdownMenuRadioItem value='popularity'>人気順</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='rating'>評価順</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='newest'>新着順</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='title'>タイトル順</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {sortedMovie.map((movie) => (
          <Card
            key={movie.id}
            className='overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow'
          >
            <div className='relative'>
              <AspectRatio ratio={2 / 3}>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className='object-cover w-full h-full rounded-t-lg'
                  />
                ) : (
                  <div className='w-full h-full bg-muted flex items-center justify-center rounded-t-lg'>
                    <p className='text-muted-foreground'>No Image</p>
                  </div>
                )}
              </AspectRatio>
              {movie.vote_average && (
                <Badge className='absolute top-2 right-2 flex items-center gap-1 bg-black/70 hover:bg-black/70'>
                  <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                  {movie.vote_average.toFixed(1)}
                </Badge>
              )}
            </div>

            <CardHeader className='pb-2'>
              <CardTitle className='line-clamp-1'>{movie.title}</CardTitle>
              {movie.release_date && (
                <CardDescription className='flex items-center gap-1'>
                  <Calendar className='h-3 w-3' />
                  {new Date(movie.release_date).getFullYear()}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className='flex-grow'>
              <ScrollArea className='h-24'>
                <p className='text-sm text-muted-foreground'>
                  {movie.overview || '概要はありません。'}
                </p>
              </ScrollArea>
            </CardContent>

            <CardFooter className='pt-2'>
              <Button variant='outline' size='sm' className='w-full'>
                詳細を見る
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
