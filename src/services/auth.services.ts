import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    signInWithRedirect
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { ensureUserProfile } from "./user.services";


export async function signupWithEmail(formData: any) {
    const { email, password, name } = formData
    const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
    );

    const user = credential.user;

    const profileRef = doc(db, "users", user.uid);
    const profileSnapshot = await getDoc(profileRef);
    if (profileSnapshot.exists()) {
        console.log(profileSnapshot.data());
    }
    await updateProfile(credential.user, {
        displayName: name?.trim(),
    });

    await ensureUserProfile(credential.user);

    return credential.user;
}

export async function loginWithEmail(formData: any) {
    const { email, password } = formData
    const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
    );

    await ensureUserProfile(credential.user);

    return credential.user;
}
export async function loginWithGoogle() {
    const googleProvider = new GoogleAuthProvider();

    googleProvider.setCustomParameters({
        prompt: "select_account",
    });
    const credential = await signInWithPopup(auth, googleProvider);
    await ensureUserProfile(credential.user);
    return credential.user;
}
export const logoutUser = () => signOut(auth);