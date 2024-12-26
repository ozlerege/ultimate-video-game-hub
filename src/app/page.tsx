import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold">Welcome to GameHub</h1>
        <p className="mt-4 text-gray-600">Your ultimate gaming destination</p>
      </main>
    </div>
  );
}
