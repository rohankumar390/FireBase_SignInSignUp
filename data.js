var firebaseConfig = {
  apiKey: "AIzaSyASp_glRyTJIid4EvAvNSo22IN0FRDSpyw",
  authDomain: "login-e984b.firebaseapp.com",
  projectId: "login-e984b",
  storageBucket: "login-e984b.appspot.com",
  messagingSenderId: "598543664599",
  appId: "1:598543664599:web:a9d4182bd72bc0df3db792",
  measurementId: "G-NC83P23YYT",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// let's code
var datab = firebase.database().ref("data");
function UserRegister() {
  var email = document.getElementById("eemail").value;
  var password = document.getElementById("lpassword").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      window.open("signin.html", "_self");
    })
    .catch(function (error) {
      var errorcode = error.code;
      var errormsg = error.message;
    });
}
const auth = firebase.auth();
function SignIn() {
  var email = document.getElementById("eemail").value;
  var password = document.getElementById("lpassword").value;

  // Check if the email and password exist in the database
  datab
    .orderByChild("email")
    .equalTo(email)
    .once("value", function (snapshot) {
      if (snapshot.exists()) {
        // Email exists in the database
        // Check if the password matches
        snapshot.forEach(function (data) {
          var userData = data.val();
          if (userData.password === password) {
            // Password matches, sign in the user

            window.open("abc.html", "_self"); // Redirect to another page
          } else {
            alert("Incorrect password");
          }
        });
      } else {
        alert("Email not found in the database");
      }
    });
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  var userInfo = datab.push();
  userInfo.set({
    name: getId("fname"),
    email: getId("eemail"),
    password: getId("lpassword"),
  });
  alert("Successfully Signed Up");
  console.log("sent");
  document.getElementById("form").reset();
});
function getId(id) {
  return document.getElementById(id).value;
}
