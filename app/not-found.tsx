import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="font-serif text-4xl text-stone-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-stone-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/el" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
