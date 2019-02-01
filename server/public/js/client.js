// $(document).ready(function() {
//   // check if user is still logged in --- authentication
//   uid = null;
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
//       uid = user.uid;
//     } else {
//       uid = null;
//       window.location.replace("index.html");
//     }
//   });

//   // firebase logout
//   function logout() {
//     firebase.auth().signout();
//   }
// });
