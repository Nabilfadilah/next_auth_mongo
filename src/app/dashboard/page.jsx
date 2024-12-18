import UserInfo from "@/components/UserInfo";
import {authOptions} from "../api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Jika tidak ada sesi, redirect ke halaman login ("/")
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 place-items-center h-screen p-5">
      <UserInfo />
    </div>
  );
}
