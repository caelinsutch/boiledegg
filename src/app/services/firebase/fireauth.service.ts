import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

// User interface

interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  userName: string;
  photoURL?: string;
}

/**
 * Fire authentication service for authentication via Firebase using google oAuth
 * TODO Add Email Support
 */

@Injectable({ providedIn: 'root' })

export class FireauthService {

  user: Observable<User>;

  constructor(
    // Creates objects for FireAuth, Firestore, and Router
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    /**
     * Gets user document
     * @returns Observable of user document data || null
     * No metadata when using valueChanges, snapshotChanges() returns metadata
     */
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // Wrapper for [Document Reference Type](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference)
          // Refers to Document Location in firebase for path
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null); // Returns undefined as observable
        }
      })
    );
  }

  /**
   * Provides a method for login using oAuth
   * Example, google login
   * @param provider
   * @returns Sign in with popup
   */
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  /**
   * Updates the user with new information
   * @param user object
   * @returns response from set function
   */
  private updateUserData(user) {
    // References user in Firestore
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      userName: user.userName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  /**
   * Signs out user and navigates to root
   */
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
