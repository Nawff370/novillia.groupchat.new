  function signInPage() {
    window.location.href = "./navs/signin.html"
  }

  function openNavForEditingProfile() {
    document.getElementById("myNavForEditingProfile").style.display = "inline";
  }
  
  function closeNavForEditingProfile() {
    document.getElementById("myNavForEditingProfile").style.display = "none";
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
  
  firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth()

  auth.signInWithEmailAndPassword('nawfunnygamer@gmail.com', 'nawfisfunny123@').catch(function(error) {
    console.error('Sign-in error:', error)
  })

  document.querySelector(".topnav a.split").style.display = "none"
  document.querySelector(".accountInfo").style.display = "none"

  var database = firebase.database()

  window.onload = function() {
    checkSavedData()

    setInterval(function() {
    checkSavedData()
    }, 100)

  }
  

  function checkSavedData() {

    fetch('https://api.ipify.org?format=json')
     .then(response => response.json())
     .then(data => {
        var ip = data.ip
        var numbers = ip.split('.').map(Number);
        var ipAddress = numbers.join('');

        var ipAddressRef = database.ref('savedLocationData/' + ipAddress)
        ipAddressRef.once('value', function(snapshot) {
          if (snapshot.exists()) {
              var userData = snapshot.val()
              var userEmail = userData.email
              var userName = userData.name
              var userPassword = userData.password
              var userProfile = userData.profile

              

              document.querySelector(".topnav a.split").style.display = "none"
              document.querySelector(".accountInfo").style.display = "inline"

              document.querySelector(".accName").textContent = userName
              document.querySelector(".accEmail").textContent = userEmail
              document.querySelector(".accountInfo").style.backgroundImage = `url(${userProfile})`
              document.querySelector(".accProfile").src = userProfile
              document.querySelector(".profilePicture").src = userProfile

              document.querySelector(".inputsPE").placeholder = userName
                
          } else {
            document.querySelector(".topnav a.split").style.display = "inline"
            document.querySelector(".accountInfo").style.display = "none"
          }
        })

      })
     .catch(error => {
        console.error(error);
      })

  }

   function toggleDropdown() {
    var dropdown = document.getElementById("AccountInfoDropdown");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
   }

  // Close the dropdown if the user clicks outside of it
   window.onclick = function(event) {
      if (!event.target.matches('.accountInfo') && !event.target.matches('.AccountInfoDropdown-content')) {
          var dropdown = document.getElementById("AccountInfoDropdown");
          if (dropdown.style.display === "block") {
              dropdown.style.display = "none";
          }
      }
   }



  