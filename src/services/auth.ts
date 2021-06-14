import { firestore, auth } from './firebase'

const generateUserDocument = async (user : any, displayName: string) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`)
  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    const { email, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL
      });
    } catch (error) {
      console.error("Error creating user document", error)
    }
  }
}

export const getUserDocument = async (uid: string) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const createUserWithEmailAndPassword = async (userData: any) => {
  return new Promise(async (resolve, reject) => {  
    try {
      const {email, password, displayName} = userData
      const {user} = await auth.createUserWithEmailAndPassword(email, password)
      generateUserDocument(user, displayName)
      resolve(user)
    } catch(error){
      reject(error)
    }
  });
};

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  return new Promise(async (resolve, reject) => {  
    try {
      resolve(await auth.signInWithEmailAndPassword(email, password))
    } catch (error) {
      reject(error)
    }
  });
};

export const signOutUser = async () => {
  return new Promise(async (resolve, reject) => {  
    try {
      resolve(await auth.signOut());
    } catch (error) {
      reject(error)
    }
  });
}