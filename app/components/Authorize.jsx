import { cookies } from "next/headers";
import Link from "next/link";

export default function AuthWrapper({ children, requiredRole }) {
  const sessionCookie = cookies().get("session");

  if (!sessionCookie) {
    console.log("No Cookie");
    return <UnauthorizedComponent />;
  }

  try {
    const sessionData = JSON.parse(sessionCookie.value);
    console.log(sessionData);
    if (sessionData.role !== "Worker" && sessionData.role !== "Contractor") {
      console.log("No Role");
      return <UnauthorizedComponent />;
    }
  } catch (error) {
    return <UnauthorizedComponent />;
  }

  return children;
}

function UnauthorizedComponent() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="max-w-[300px] flex flex-col text-center space-y-2">
        <h1 className="font-bold text-3xl">401 Unauthorized</h1>
        <p className="font-medium">You do not have permission to access this page.</p>
        <Link href={"/"} className="mt-8 w-full py-3 font-semibold text-white bg-primary rounded-lg">Login</Link>
      </div>
    </div>
  );
}
