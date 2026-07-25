export default function Loading() {
  return (
    <main className="mx-auto min-h-[70vh] max-w-7xl animate-pulse px-5 py-16 sm:px-6 sm:py-20" aria-label="Loading page">
      <div className="h-4 w-32 rounded-full bg-[#E7D8C7]" />
      <div className="mt-5 h-12 max-w-2xl rounded-2xl bg-[#E7D8C7]" />
      <div className="mt-4 h-6 max-w-xl rounded-xl bg-[#EFE4D8]" />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[1,2,3,4,5,6].map((item) => <div key={item} className="h-72 rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8]" />)}
      </div>
    </main>
  );
}
