import { auth } from "@/includes/firebase";
import type { ICredential, IUser } from "@/types/NoteTypes";
import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

/** */
export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      user: null as IUser | null,
    };
  },
  actions: {
    async init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userObj: IUser = {
            id: user.uid,
            email: user.email as string,
          };
          this.user = userObj;
          this.router.push("/");
          // ...
        } else {
          // User is signed out
          // ...
          this.user = null;
          this.router.replace("/auth");
          console.log("logout", user, this.user);
        }
      });
    },
    async registerUser(credentials: ICredential) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
    async loginUser(credentials: ICredential) {
      try {
        await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
    async logOut() {
      try {
        await signOut(auth);
        console.log("Log out successfully");
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
  },
  getters: {},
});
