import { auth } from '@/lib/auth';
import { FC } from 'react';

const Home: FC = async () => {
  const session = await auth();
  return (
    <div className=''>
      <div className='text-lg font-bold'>Home</div>
      <div>
        <span className='text-blue-500'>Hello</span>
        <span className='text-red-500'>World</span>
      </div>
      <pre className='bg-slate-100 p-2 text-sm text-slate-700'>
        {JSON.stringify(session, null, 2)}
      </pre>
      <a href='movie'>movie</a>
    </div>
  );
};

export default Home;
