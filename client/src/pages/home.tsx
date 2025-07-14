import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/home/hero";
import PackageCard from "@/components/packages/package-card";
import { Package } from "@shared/schema";

export default function Home() {
  const { data: packages, isLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  return (
    <div>
      <Hero />

      {/* Top Destinations */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Popular Destinations
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-[300px] sm:h-[350px] md:h-[400px] bg-gray-100 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {packages?.slice(0, 8).map((pkg, index) => (
                <PackageCard key={pkg.id} package={pkg} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
