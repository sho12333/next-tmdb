import React from 'react'

const HomePage: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl font-bold mb-4'>映画紹介ウェブサイトへようこそ！</h1>
      <p className='text-lg text-center'>最新の映画やテレビ番組を探索して発見しましょう。</p>

      <div className='flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full'>
        <a
          href='/firebase'
          className='p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600'
        >
          <h3 className='text-2xl font-bold'>Firebase Movie &rarr;</h3>
          <p className='mt-4 text-xl'>
            FirebaseのCloud Storeに保存されたDBから映画情報を取得します。
          </p>
        </a>

        <a
          href='/movie'
          className='p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600'
        >
          <h3 className='text-2xl font-bold'>Tmdb Movie &rarr;</h3>
          <p className='mt-4 text-xl'>TmdbのAPIから人気作品10作品を取得します。</p>
        </a>
      </div>
    </div>
  )
}

export default HomePage
