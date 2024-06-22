import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
function SignOut() {
     const auth = firebase.auth();

    return auth.currentUser && (
    <button onClick={() => auth.SignOut()}>Sign Out</button>
)
}
export default SignOut