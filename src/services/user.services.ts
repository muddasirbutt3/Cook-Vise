import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function ensureUserProfile(user: any) {
    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);

    // Don't overwrite an existing user's profile.
    if (snapshot.exists()) {
        return snapshot.data();
    }

    const profile = {
        name: user.displayName ?? "",
        email: user.email ?? "",
        photoURL: user.photoURL ?? "",
        createdAt: serverTimestamp(),
    };

    await setDoc(userRef, profile);

    return profile;
}