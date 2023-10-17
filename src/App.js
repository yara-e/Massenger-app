
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
firebase.initializeApp({
  apiKey: "AIzaSyCvIXwViWlrygPQ90RZQEzbOVTAhi2h89o",
  authDomain: "chat-1b248.firebaseapp.com",
  projectId: "chat-1b248",
  storageBucket: "chat-1b248.appspot.com",
  messagingSenderId: "185042997208",
  appId: "1:185042997208:web:dfd2db809c27ea4ffeecad"
})
function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
