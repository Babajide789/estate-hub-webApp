export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="animate-pulse space-y-6">
        <div className="h-6 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />

        <div className="h-105 bg-gray-200 rounded-lg" />

        <div className="grid grid-cols-3 gap-4">
          <div className="h-16 bg-gray-200 rounded" />
          <div className="h-16 bg-gray-200 rounded" />
          <div className="h-16 bg-gray-200 rounded" />
        </div>

        <div className="h-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
