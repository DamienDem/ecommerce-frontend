import { auth } from "../../firebase.config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

export class AuthService {
  async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  }

  async signUpWithEmailAndPassword(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<User> {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    //TODO: connection with the database
    console.log(firstName, lastName);

    return result.user;
  }

  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  }

  async signOut(): Promise<void> {
    await signOut(auth);
  }

  getCurrentUser(): User | null {
    return auth.currentUser;
  }
}
