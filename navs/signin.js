
document.querySelector(".topnav a.split").style.display = "none"

function signInNow() {
  document.querySelector(".logInTabShow").style.display = "none";
  document.querySelector(".signInTabShow").style.display = "block";
  document.querySelector(".tablink1").style.color = "black";
  document.querySelector(".tablink1").style.backgroundColor = "#f2f2f2";
  document.querySelector(".tablink2").style.color = "white";
  document.querySelector(".tablink2").style.backgroundColor = "rgb(174, 44, 214)";
}

function logInNow() {
  document.querySelector(".signInTabShow").style.display = "none";
  document.querySelector(".logInTabShow").style.display = "block";
  document.querySelector(".tablink1").style.color = "white";
  document.querySelector(".tablink1").style.backgroundColor = "rgb(174, 44, 214)";
  document.querySelector(".tablink2").style.color = "black";
  document.querySelector(".tablink2").style.backgroundColor = "#f2f2f2";
}


const firebaseConfig = {

  apiKey: "AIzaSyBy80iYyXzTB_FodMshSHEK_jsphsMMb-M",
  authDomain: "novilia2023-aac9d.firebaseapp.com",
  databaseURL: "https://novilia2023-aac9d-default-rtdb.firebaseio.com",
  projectId: "novilia2023-aac9d",
  storageBucket: "novilia2023-aac9d.appspot.com",
  messagingSenderId: "1024302453931",
  appId: "1:1024302453931:web:5bbda5a7d151c42b8a13ee"

}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Reference to the form
const form = document.getElementById('signInForm')

// Authenticate
const auth = firebase.auth()

// Your UID - Replace with your actual UID
const yourUID = 'FiwC4nP0I3MprP3SMuQnDNwd3ea2'

// Sign in with email and password
auth.signInWithEmailAndPassword('nawfunnygamer@gmail.com', 'nawfisfunny123@').catch(function(error) {
  // Handle errors if any
  console.error('Sign-in error:', error)
});


  window.onload = function() {
    signInMain()
    loginMain()

    setInterval(function() {
      signInMain()
    }, 1000)

    setInterval(function() {
      loginMain()
    }, 1000)

  }



function signInMain() {
    // Variables
    var nameOfUser = document.getElementById('name').value
    var email = document.getElementById('email').value
    var pass = document.getElementById('password').value
    var passcm = document.getElementById('passwordcm').value

    var database = firebase.database()

    // Password length check to display
    if (pass=="") {
      document.querySelector(".passnot").style.display = "inline"
    } else {
      document.querySelector(".passnot").style.display = "none"
      if (pass.length < 8) {
        document.querySelector(".alert1").style.display = "block"
      } else {
        document.querySelector(".alert1").style.display = "none"
      }
    }

    // Passwords matching check to display
    if (passcm=="") {
      document.querySelector(".passcmnot").style.display = "inline"
    } else {
      document.querySelector(".passcmnot").style.display = "none"
      if (pass==passcm) {
        document.querySelector(".alert2").style.display = "none"
      } else {
        document.querySelector(".alert2").style.display = "block"
      }
    }

    // Username check to display
    var usersRef = database.ref('users/' + nameOfUser)
    usersRef.once('value', function(snapshot) {
      if (nameOfUser=='') {
        document.querySelector(".namenot").style.display = "inline"
      } else {
        document.querySelector(".namenot").style.display = "none"
        if (snapshot.exists()) {
          document.querySelector(".alert4").style.display = "block"
        } else {
          document.querySelector(".alert4").style.display = "none"
        }
      }
    })


    // Email check to display
    var usersRefEmail = database.ref('users')
      usersRefEmail.once('value', function(snapshot) {
        if (snapshot.exists()) {
          snapshot.forEach(function(userSnapshot) {
            var userData = userSnapshot.val()
            var userEmailAddress = userData.email
            if (email=="") {
              document.querySelector(".emailnot").style.display = "inline"
            } else {
              document.querySelector(".emailnot").style.display = "none"
            }

            if (userEmailAddress==email) {
              document.querySelector(".alert3").style.display = "block"
            } else {
              document.querySelector(".alert3").style.display = "none"
            }

          })
        } else {
        }
      })

    // Checkbox check to display
    var checkBox = document.getElementById("agreeCheck")
    if (checkBox.checked == true) {
      document.querySelector(".submitButtonDecoy").style.display = "none"
      document.querySelector(".submitButton").style.display = "block"
    } else  {
      document.querySelector(".submitButtonDecoy").style.display = "block"
      document.querySelector(".submitButton").style.display = "none"
    }

}



    // Handle the form submit
    
    document.getElementById('signInForm').addEventListener('submit', submitSignIn)

function submitSignIn(e) {

  e.preventDefault()
    
  var nameOfUser = document.getElementById('name').value
  var email = document.getElementById('email').value
  var pass = document.getElementById('password').value
  var passcm = document.getElementById('passwordcm').value
  
  var database = firebase.database()

  // Password length check
  var lengthCheck = 0
  if (pass=="") {
    document.querySelector(".passnot").style.display = "inline"
    lengthCheck = 0
  } else {
    document.querySelector(".passnot").style.display = "none"
    if (pass.length < 8) {
      document.querySelector(".alert1").style.display = "block"
      lengthCheck = 0
    } else {
      document.querySelector(".alert1").style.display = "none"
      lengthCheck = 1
    }
  }

  // Passwords matching check
  var matchCheck = 0
  if (passcm=="") {
    document.querySelector(".passcmnot").style.display = "inline"
    matchCheck = 0
  } else {
    document.querySelector(".passcmnot").style.display = "none"
    if (pass==passcm) {
      document.querySelector(".alert2").style.display = "none"
      matchCheck = 1
    } else {
      document.querySelector(".alert2").style.display = "block"
      matchCheck = 0
    }
  }

    // Username check 
    var nameCheck = 0
    var usersRef = database.ref('users/' + nameOfUser)
    var nameCheckPromise = new Promise(function(resolve, reject) {
    usersRef.once('value', function(snapshot) {
      if (nameOfUser=='') {
        document.querySelector(".namenot").style.display = "inline"
      } else {
        document.querySelector(".namenot").style.display = "none"
        if (snapshot.exists()) {
          document.querySelector(".alert4").style.display = "block"
          nameCheck = 0
          resolve(nameCheck)
        } else {
          document.querySelector(".alert4").style.display = "none"
          nameCheck = 1
          resolve(nameCheck)
        }
      }
    })

  })

  // Email check
  var usersRefEmail = database.ref('users')
  var emailCheckPromise = new Promise(function(resolve, reject) {
  var emailCheck = 0
    usersRefEmail.once('value', function(snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function(userSnapshot) {
          var userData = userSnapshot.val()
          var userEmailAddress = userData.email

          if (email=="") {
            emailCheck = 0
            document.querySelector(".emailnot").style.display = "inline"
          } else {
            document.querySelector(".emailnot").style.display = "none"
          }

          if (userEmailAddress === email) {
            emailCheck = 0
            resolve(emailCheck)
            document.querySelector(".alert3").style.display = "block"
          } else {
            emailCheck = 1
            resolve(emailCheck)
            document.querySelector(".alert3").style.display = "none"
          }

          // Resolve the promise with the emailCheck value
        })
      } else {
        // No users found in the database
        resolve(emailCheck)
      }
    })
  })

      emailCheckPromise.then(function(emailCheck) {
        nameCheckPromise.then(function(nameCheck) { 
          if (lengthCheck==1, matchCheck==1, emailCheck==1, nameCheck==1) {
            createNewAccount(nameOfUser, email, pass)

            document.getElementById('nameLogin').value = nameOfUser
            document.getElementById('passLogin').value = pass

            document.getElementById('name').value = ""
            document.getElementById('email').value = ""
            document.getElementById('password').value = ""
            document.getElementById('passwordcm').value = ""
            document.getElementById("agreeCheck").checked = false

            
            // open nav
            document.getElementById("myNavForSignIn").style.display = "block";

            setTimeout(function() {
              document.querySelector(".goingThrough1").style.display = "none"
              document.querySelector(".goingThrough2").style.display = "inline"
              logInNow()

              setTimeout(function() {
                // close nav
                document.getElementById("myNavForSignIn").style.display = "none";
                
              }, 2000)
  
            }, 4000)

          }
        })
      })
    
    
    }


// Save data to the database
const createNewAccount = (nameOfUser, email, pass) => {
  var newSigninForm = firebase.database().ref('users/' + nameOfUser)

  newSigninForm.set({
    name: nameOfUser,
    email: email,
    password: pass,
  })
}

// Handle the login form submit
document.getElementById('logInForm').addEventListener('submit', submitFormForLogin);

function loginMain() {

  var name = document.getElementById('nameLogin').value
  var password = document.getElementById('passLogin').value

  if (name=="") {
    document.querySelector(".alert6").style.display = "inline"
  } else {
    document.querySelector(".alert6").style.display = "none"
  }

  if (password=="") {
    document.querySelector(".alert7").style.display = "inline"
  } else {
    document.querySelector(".alert7").style.display = "none"
  }


}

function submitFormForLogin(e) {
  e.preventDefault()

  var database = firebase.database()

  var name = document.getElementById('nameLogin').value
  var password = document.getElementById('passLogin').value

  if (name=="" || password=="") {
    // Handle empty fields if needed
  } else {
    var usersRef = database.ref('users/' + name)

    usersRef.once('value', function(snapshot) {
      if (snapshot.exists()) {
        document.querySelector(".alert5").style.display = "none"

        var userData = snapshot.val()
        var userPassword = userData.password
        var userEmail = userData.email
        var userName = userData.name

        if (userPassword === password) {
          document.querySelector(".alert5").style.display = "none"

          fetch('https://api.ipify.org?format=json')
         .then(response => response.json())
         .then(data => {
          var ip = data.ip
          var numbers = ip.split('.').map(Number);
          var ipAddress = numbers.join('');

          var newIpForm = firebase.database().ref('savedLocationData/' + ipAddress)

          newIpForm.set({
            name: userName,
            email: userEmail,
            password: userPassword,
            profile: "https://openclipart.org/image/800px/247320"
          })

          // open nav
          document.getElementById("myNavForLogin").style.display = "block"

          setTimeout(function() {
            document.querySelector(".goingThrough12").style.display = "none"

            document.querySelector(".goingThrough22").style.display = "inline"
            logInNow()

            setTimeout(function() {

              document.getElementById("myNavForLogin").style.display = "none"
              window.location.href = "../index.html"
            }, 2000)

          }, 4000)

        })

        .catch(error => {
          console.error(error);
        })

        } else {
          document.querySelector(".alert5").style.display = "block"
        }
      } else {
        document.querySelector(".alert5").style.display = "block"
      }
    })
  }
}


  



