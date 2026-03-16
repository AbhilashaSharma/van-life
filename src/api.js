// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDykXYp6b6kPaDFaUjhc3wrWTaFVFCrsAI",
  authDomain: "vans9-9f97c.firebaseapp.com",
  projectId: "vans9-9f97c",
  storageBucket: "vans9-9f97c.firebasestorage.app",
  messagingSenderId: "701568848747",
  appId: "1:701568848747:web:4db46eaea7f94fd0d5322e",
  measurementId: "G-SZN006WZJM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");
export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const vanSnapshot = await getDoc(docRef);
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id,
  };
}
// export async function getVans(id) {
//   const url = id ? `/api/vans/${id}` : "/api/vans";
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error(
//       JSON.stringify({
//         status: res.status,
//         message: "Failed to fetch vans",
//         statusText: res.statusText,
//       }),
//     );
//   }
//   const data = await res.json();
//   return data.vans;
// }

export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}
// export async function getHostVans(id) {
//   const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error(
//       JSON.stringify({
//         message: "Failed to fetch vans",
//         statusText: res.statusText,
//         status: res.status,
//       }),
//     );
//   }
//   const data = await res.json();
//   return data.vans;
// }

export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      JSON.stringify({
        message: data.message,
        statusText: res.statusText,
        status: res.status,
      }),
    );
  }
  return data;
}
