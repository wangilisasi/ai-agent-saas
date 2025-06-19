import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  // If the user is not an admin, redirect them to the home page
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <p className="mt-4 text-gray-600">
        Welcome, <span className="font-semibold">{session.user.name}</span>. You have access to this
        restricted area because your role is 'ADMIN'.
      </p>
      {/* Add your admin-only components and data here */}
    </div>
  );
} 