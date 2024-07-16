import Image from "next/image";
import Layout from "./components/layout";

import Link from "next/link";

export default function Home() {
  return (
    <Layout>
    <section className="mb-4">
      <h2 className="text-2xl font-bold mb-4">Currently Airing</h2>
      <div className="grid grid-cols-6 gap-8">
        {/* Placeholder for currently airing movies */}
        {[...Array(11)].map((_, index) => (
          <div key={index} className="bg-gray-300 p-4 rounded h-56 flex items-center justify-center mb-4">
            Movie {index + 1}
          </div>
        ))}
        <Link href="/currently-airing">
          <div className="bg-gray-600 p-4 rounded h-56 flex items-center justify-center hover:underline">
            Show more
          </div>
        </Link>
      </div>
    </section>

    <section className="mb-4">
      <h2 className="text-2xl font-bold mb-4">Popular</h2>
      <div className="grid grid-cols-6 gap-8">
        {/* Placeholder for popular movies */}
        {[...Array(11)].map((_, index) => (
          <div key={index} className="bg-gray-300 p-4 rounded h-56 flex items-center justify-center mb-4">
            Popular Movie {index + 1}
          </div>
        ))}
        <Link href="/popular">
          <div className="bg-gray-600 p-4 rounded h-56 flex items-center justify-center hover:underline">
            Show more
          </div>
        </Link>      
        </div>
    </section>
  </Layout>
  );
}
