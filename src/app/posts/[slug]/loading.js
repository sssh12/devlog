export default function LoadingPost() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 bg-gray-200 rounded w-3/4 h-10 animate-pulse"></h1>
      <p className="text-gray-500 mb-4 bg-gray-200 rounded w-1/4 h-6 animate-pulse"></p>
      <div className="space-y-2">
        <div className="bg-gray-200 rounded w-full h-6 animate-pulse"></div>
        <div className="bg-gray-200 rounded w-full h-6 animate-pulse"></div>
        <div className="bg-gray-200 rounded w-5/6 h-6 animate-pulse"></div>
      </div>
    </div>
  );
}
