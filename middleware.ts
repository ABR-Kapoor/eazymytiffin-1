import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
<<<<<<< HEAD
  "/sso-callback(.*)",
=======
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
  "/api/webhook(.*)",
  "/api/webhooks(.*)",
  "/payments/success(.*)",
  "/payments/failed(.*)",
  "/payments/phonepe-mock(.*)",
  "/landing(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|static|.*\\.png|.*\\.svg|.*\\.ico|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)", "/api/(.*)"],
};
