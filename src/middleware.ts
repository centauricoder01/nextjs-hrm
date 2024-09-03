import { NextRequest, NextResponse } from "next/server";

// MIDDLEWARE RUNS BEFORE ANY PAGE RENDER EVEN BEFORE FRONTEND AND BACKEND. FIRST MIDDLEWARE RUNS AND AFTER THAT ALL OTHER PAGES RUNS.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verify } from "jsonwebtoken";

// const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key"; // Ensure to set this in your environment variables

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const token = request.cookies.get("authToken");

//   console.log(SECRET_KEY);

//   try {
//     if (!token) {
//       // Redirect to "/" if the user is not authenticated
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     const decoded = verify(token.value, SECRET_KEY) as {
//       role: string;
//     };

//     const { role } = decoded;

//     console.log(decoded, "this is my role");

//     // Allow access to the root path ("/") or the login page even without a token
//     if (path === "/" && !token) {
//       return NextResponse.next();
//     }

//     if (role === "Employee" && !path.startsWith("/console/employee")) {
//       return NextResponse.redirect(new URL("/unauthorized", request.url)); // Redirect to an unauthorized page
//     }

//     if (role === "Admin" && !path.startsWith("/console/admin")) {
//       return NextResponse.redirect(new URL("/unauthorized", request.url)); // Redirect to an unauthorized page
//     }
//   } catch (error) {
//     console.log(error);
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Proceed to the requested path if authenticated
//   return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/console/employee/:path*", "/console/admin/:path*"],
// };
