import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import type { ReactNode } from "react";

function ProtectedRoute() {
  const { user, loading } = useUser();
  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (user) {
    <Navigate to={"/login"} />;
  }
  return <Outlet />;
}
export function PublicOnlyRoute() {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {

//     match /users/{userId} {
//       // Only the authenticated owner can read their profile.
//       allow read: if request.auth != null
//                   && request.auth.uid == userId;

//       // Users can create only their own profile,
//       // with fields and values matching this schema.
//       allow create: if request.auth != null
//                     && request.auth.uid == userId
//                     && request.resource.data.keys().hasOnly([
//                       'name',
//                       'email',
//                       'createdAt'
//                     ])
//                     && request.resource.data.keys().hasAll([
//                       'name',
//                       'email',
//                       'createdAt'
//                     ])
//                     && request.resource.data.name is string
//                     && request.resource.data.email is string
//                     && request.resource.data.email == request.auth.token.email
//                     && request.resource.data.createdAt == request.time;

//       // Users can update their own name, but not their email
//       // or creation timestamp through this rule.
//       allow update: if request.auth != null
//                     && request.auth.uid == userId
//                     && request.resource.data.diff(
//                          resource.data
//                        ).affectedKeys().hasOnly(['name'])
//                     && request.resource.data.name is string;

//       // Profile deletion is not enabled in this example.
//       allow delete: if false;
//     }
//   }
// }
