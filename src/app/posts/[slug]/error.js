"use client";

export default function PostError({ error, reset }) {
  return (
    <div>
      <h2>앗, 에러가 발생했습니다!</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        다시 시도
      </button>
    </div>
  );
}
