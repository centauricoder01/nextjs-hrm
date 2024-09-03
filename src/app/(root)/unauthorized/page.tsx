import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">403 - Unauthorized</h1>
      <p className="mt-4">You do not have permission to view this page.</p>
      <Link href="/" className="mt-6 text-blue-500 underline">
        Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
