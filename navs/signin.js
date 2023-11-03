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

function home() {
  window.location.href = "../index.html" // to home
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

const form = document.getElementById('signInForm')

const auth = firebase.auth()

const yourUID = 'FiwC4nP0I3MprP3SMuQnDNwd3ea2'

auth.signInWithEmailAndPassword('nawfunnygamer@gmail.com', 'nawfisfunny123@').catch(function(error) {
  console.error('Sign-in error:', error)

})

  window.onload = function() {
    signInMain()
    loginMain()
    mainDetailsCheck()

    setInterval(function() {
      signInMain()
    }, 1000)

    setInterval(function() {
      loginMain()
    }, 1000)

    setInterval(function() {
      mainDetailsCheck()
    }, 1000)


  }

  var loginDetailsWritten = ""
  var signinDetailsWritten = ""


  function mainDetailsCheck() {

    if (loginDetailsWritten==1) {
      window.onbeforeunload = function() {
       return "login details not saved, leave page?"
      }

    } else if (signinDetailsWritten==1) {
      window.onbeforeunload = function() {
       return "signin details not saved, leave page?"
      }

    } else if (signinDetailsWritten==1, loginDetailsWritten==1) {
      window.onbeforeunload = function() {
       return "account details are not saved, leave page?"
      }
      
    }
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

    if (!nameOfUser=="" || !email=="" || !passcm=="" || !pass=="") {
     signinDetailsWritten=1
    } else if ((nameOfUser=="" || email=="" || passcm=="" || pass=="")) {
      signinDetailsWritten=0
    }


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

            // Date of account creation
            var currentdate = new Date()
            var date = currentdate.toLocaleString()

            var dateOfCreation = date.replace(/\//g, 'NN').replace(/:/g, 'CC').replace(/,/g, '');
            
            async function generateUID(email, password) {
              const encoder = new TextEncoder();
              const data = encoder.encode(email + password);
              
              const buffer = await crypto.subtle.digest('SHA-256', data);
              
              const byteArray = Array.from(new Uint8Array(buffer));
              const hexString = byteArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
              
              return hexString
            }

            var uid = generateUID(email, pass).then((l)=>{

              // Creating account
              createNewAccount(nameOfUser, email, pass, l, dateOfCreation)
            })


            document.getElementById('nameLogin').value = nameOfUser
            document.getElementById('passLogin').value = pass

            
            // open nav
            document.getElementById("myNavForSignIn").style.display = "block";

            document.getElementById('name').value = ""
            document.getElementById('email').value = ""
            document.getElementById('password').value = ""
            document.getElementById('passwordcm').value = ""
            document.getElementById("agreeCheck").checked = false

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
const createNewAccount = (nameOfUser, email, pass, uid, doc) => {
  var newSigninForm = firebase.database().ref('users/' + nameOfUser)

  newSigninForm.set({
    name: nameOfUser,
    email: email,
    password: pass,
    theme: "default",
    doc: doc,
    uid: uid,
    profile: "https://openclipart.org/image/800px/247320"
  })
}

// Handle the login form submit
document.getElementById('logInForm').addEventListener('submit', submitFormForLogin);

function loginMain() {

  var name = document.getElementById('nameLogin').value
  var password = document.getElementById('passLogin').value

  if (!name=="" || !password=="") {
    loginDetailsWritten=1
  } else if (name=="" || password=="") {
    loginDetailsWritten=0
  }

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

  if (name=="" || password=="") {} else {

    var usersRef = database.ref('users/' + name)

    usersRef.once('value', function(snapshot) {
      if (snapshot.exists()) {
        document.querySelector(".alert5").style.display = "none"

        var userData = snapshot.val()
        var userPassword = userData.password
        var userEmail = userData.email
        var userName = userData.name
        var userDOC = userData.doc
        var userUid = userData.uid
        var userProfile = userData.profile

        if (userPassword === password) {
          document.querySelector(".alert5").style.display = "none"

          fetch('https://api.ipify.org?format=json')
         .then(response => response.json())
         .then(data => {


          // Formatting ip
          const formattedIP = data.ip
          const replacement = "3202"
          const ipAddress = formattedIP.split('.').join(replacement)
         
          var newIpForm = firebase.database().ref('savedLocationData/' + ipAddress)

          newIpForm.set({
            name: userName,
            email: userEmail,
            password: userPassword,
            theme: "default",
            doc: userDOC,
            uid: userUid,
            profile: userProfile
          })

          // open nav
          document.getElementById("myNavForLogin").style.display = "block"

          setTimeout(function() {
            document.querySelector(".goingThrough12").style.display = "none"

            document.querySelector(".goingThrough22").style.display = "inline"
            logInNow()

            setTimeout(function() {

              document.getElementById("myNavForLogin").style.display = "none"
              window.location.href = "../index.html" // to home
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



  
document.getElementById('uidLoginForm').addEventListener('submit', submitFormForUid);


function submitFormForUid(e) {

  e.preventDefault()

  var database = firebase.database()

  var uid = document.getElementById('uidlogin').value
  
    var usersRef = database.ref('users/')
    usersRef.once('value', function(snapshot) {
      
      snapshot.forEach(function(userSnapshot) {
        var userData = userSnapshot.val()
        var userEmail = userData.email
        var userName = userData.name
        var userPassword = userData.password
        var userProfile = userData.profile
        var userDOC = userData.doc
        var userUid = userData.uid
        var userProfile = userData.profile
        var userTheme = userData.theme
        
        var uids = []
        uids.push(userUid)
        var userUid1 = uids[0]

        if (userUid1==uid) {
          document.getElementById("myNavForLogin").style.display = "block"
          setTimeout(function() {

            document.querySelector(".goingThrough12").style.display = "none"
            document.querySelector(".goingThrough22").style.display = "inline"         

          }, 4000)


          fetch('https://api.ipify.org?format=json')
         .then(response => response.json())
         .then(data => {


          // Formatting ip
          const formattedIP = data.ip
          const replacement = "3202"
          const ipAddress = formattedIP.split('.').join(replacement)
         
          var newIpForm = firebase.database().ref('savedLocationData/' + ipAddress)

          newIpForm.set({
            name: userName,
            email: userEmail,
            password: userPassword,
            theme: "default",
            doc: userDOC,
            uid: userUid,
            profile: userProfile
          })

          // open nav
          

          setTimeout(function() {

            document.getElementById("myNavForLogin").style.display = "none"
            window.location.href = "../index.html" // to home
          }, 2000)

        })

        .catch(error => {
          console.error(error);
        })
          
        } else {
          document.querySelector(".alert9").style.display = "block"

        }


      })

    })
    

}

