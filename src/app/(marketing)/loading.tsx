// Skeleton matching actual marketing page layout:
// SectionHeader (badge → title → description) + content grid.
// Renders inside PageTransition between Navbar and Footer.
export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero / Header Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          {/* SectionHeader skeleton */}
          <div className="mb-12 flex flex-col gap-4 items-start max-w-2xl">
            {/* Badge pill */}
            <div className="h-6 w-28 bg-slate-100 rounded-full" />
            {/* Title */}
            <div className="space-y-3">
              <div className="h-10 w-80 bg-slate-200 rounded-xl max-w-full" />
              <div className="h-10 w-56 bg-slate-200 rounded-xl max-w-full" />
            </div>
            {/* Description */}
            <div className="space-y-2.5 pt-2">
              <div className="h-4 w-96 bg-slate-100 rounded-lg max-w-full" />
              <div className="h-4 w-72 bg-slate-100 rounded-lg max-w-full" />
            </div>
          </div>

          {/* Content grid skeleton — 3 columns on md */}
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                {/* Card image */}
                <div className="aspect-[4/3] bg-slate-100 rounded-[32px]" />
                {/* Card body */}
                <div className="space-y-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className="h-px w-6 bg-slate-200" />
                    <div className="h-3 w-24 bg-slate-100 rounded-full" />
                  </div>
                  <div className="h-5 w-full bg-slate-200 rounded-lg" />
                  <div className="h-5 w-3/4 bg-slate-200 rounded-lg" />
                  <div className="h-3 w-full bg-slate-100 rounded-lg" />
                  <div className="h-3 w-5/6 bg-slate-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary section skeleton */}
      <section className="py-24 px-6 border-t border-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text side */}
            <div className="space-y-4">
              <div className="h-6 w-24 bg-slate-100 rounded-full" />
              <div className="h-10 w-64 bg-slate-200 rounded-xl" />
              <div className="space-y-2.5 pt-4">
                <div className="h-4 w-full bg-slate-100 rounded-lg" />
                <div className="h-4 w-full bg-slate-100 rounded-lg" />
                <div className="h-4 w-2/3 bg-slate-100 rounded-lg" />
              </div>
            </div>
            {/* Image side */}
            <div className="aspect-[4/3] bg-slate-100 rounded-xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
