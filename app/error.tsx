'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>{error.message}</h2>
      <button onClick={() => reset()}>try again</button>
    </div>
  );
}
