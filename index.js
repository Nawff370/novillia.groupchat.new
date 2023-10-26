  function signInPage() {
    window.location.href = "./navs/signin.html"
  }

  function openNavForEditingProfile() {
    document.getElementById("myNavForEditingProfile").style.display = "inline";
  }
  
  function closeNavForEditingProfile() {
    document.getElementById("myNavForEditingProfile").style.display = "none";
  }

  var accountUid = ""
  var permforautoplay = ""

  function copyUid() {
    navigator.clipboard.writeText(accountUid)
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

 
    document.querySelector(".goingThrough1").style.display = "inline"

    document.getElementById("waitingScreen").style.display = "block"


  var database = firebase.database()

  window.onload = function() {
    checkSavedData()
    profileEditor()

    setInterval(function() {
    checkSavedData()
    }, 100)

    setInterval(function() {
      profileEditor()
    }, 100)

  }



  function checkSavedData() {


    fetch('https://api.ipify.org?format=json')
     .then(response => response.json())
     .then(data => {

      var formattedIP = data.ip
      const replacement = "3202";
      const ipAddress = formattedIP.split('.').join(replacement);

        var ipAddressRef = database.ref('savedLocationData/' + ipAddress)
        ipAddressRef.once('value', function(snapshot) {
          if (snapshot.exists()) {
              var userData = snapshot.val()
              var userEmail = userData.email
              var userName = userData.name
              var userPassword = userData.password
              var userProfile = userData.profile
              var userDOC = userData.doc
              var userUid = userData.uid
              var userProfile = userData.profile
              var userTheme = userData.theme

              document.querySelector(".topnav a.split").style.display = "none"
              document.querySelector(".accountInfo").style.display = "inline"

              document.querySelector(".accName").textContent = userName
              document.querySelector(".accEmail").textContent = userEmail
              document.querySelector(".accountInfo").style.backgroundImage = `url(${userProfile})`
              document.querySelector(".accProfile").style.backgroundImage = `url(${userProfile})`
              document.querySelector(".profilePicture").style.backgroundImage = `url(${userProfile})`
             
              accountUid = userUid
              document.querySelector(".inputsPE1").placeholder = userName + " (current nametag)"

              document.getElementById("waitingScreen").style.display = "none" 

              document.getElementById("emailAddressAD").textContent = userEmail
              document.getElementById("usernameAD").textContent = userName

              var dateOfCreation = userDOC.replace(/NN/g, '\/').replace(/CC/g, ':')


              document.getElementById("dateCreatedAD").textContent = dateOfCreation

              
              document.getElementById("secretKeyAD").textContent = userUid


          } else {
            document.querySelector(".topnav a.split").style.display = "inline"
            document.querySelector(".accountInfo").style.display = "none"

            document.getElementById("waitingScreen").style.display = "none"

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
        document.querySelector(".overlayAccDetails").style.display = "none"
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


  function profileEditor() {

    fetch('https://api.ipify.org?format=json')
     .then(response => response.json())
     .then(data => {

      var formattedIP = data.ip
      const replacement = "3202";
      const ipAddress = formattedIP.split('.').join(replacement);

      var ipAddressRef = database.ref('savedLocationData/' + ipAddress)
         ipAddressRef.once('value', function(snapshot) {
          if (snapshot.exists()) {
              var userData = snapshot.val()
              var userEmail = userData.email
              var userName = userData.name
              var userPassword = userData.password
              var userProfile = userData.profile
              var userDOC = userData.doc
              var userUid = userData.uid
              var userProfile = userData.profile
              var userTheme = userData.theme


              var nametag = document.getElementById('name').value
              var oldpass = document.getElementById('oldpassword').value
              var newpass = document.getElementById('newpassword').value

              var usersRef = database.ref('users/' + nametag)
              usersRef.once('value', function(snap2) {

                const fileInput = document.getElementById('profileImage')

                fileInput.addEventListener('click', () => {
                  // This code will run when a file is selected using the file input.
                  const filepick = document.getElementById('profilePicker')
                  filepick.type = 'file'

                  filepick.onchange = e => { 

                    // getting a hold of the file reference
                    var file = e.target.files[0]; 
                 
                    // setting up the reader
                    var reader = new FileReader();
                    reader.readAsDataURL(file); // this is reading as data url
                 
                    // here we tell the reader what to do when it's done reading...
                    reader.onload = readerEvent => {
                       var content = readerEvent.target.result; // this is the content!                    

                      var ipAddressRef = database.ref('savedLocationData/' + ipAddress)
                      ipAddressRef.once('value', function(snapshot) {
                       if (snapshot.exists()) {
                       var userData = snapshot.val()
                       var userEmail = userData.email
                       var userName = userData.name
                       var userPassword = userData.password
                       var userProfile = userData.profile
                       var userDOC = userData.doc
                       var userUid = userData.uid
                       var userProfile = userData.profile
                       var userTheme = userData.theme

                       ipAddressRef.update({
                        profile: content
                       })

                        var realDatabase = database.ref('users/' + userName)
                        realDatabase.once('value', function(snapshot) {
                         if (snapshot.exists()) {
                         var userData = snapshot.val()
                         var userEmail = userData.email
                         var userName = userData.name
                         var userPassword = userData.password
                         var userProfile = userData.profile
                         var userDOC = userData.doc
                         var userUid = userData.uid
                         var userProfile = userData.profile
                         var userTheme = userData.theme

                         realDatabase.update({
                          profile: content
                         })


                        } else {}
                       })

                      } else {}
                     })
                   }
                 
                 }

                  filepick.click()

                if (file) {
                  alert('HI')
                }
               });
            
          
              
                 if (nametag=="") {
                  document.querySelector(".alert3").style.display = "none"
                  document.querySelector(".checkmark1").style.color = "rgb(255, 0, 0)"
                 } else if (nametag==userName) {
                   document.querySelector(".alert3").style.display = "none"
                   document.querySelector(".checkmark1").style.color = "rgb(14, 240, 6)"
                   var userCheck = 1
                 } else if (snap2.exists()) {
                   document.querySelector(".alert3").style.display = "block"
                   document.querySelector(".checkmark1").style.color = "rgb(255, 0, 0)"
                   var userCheck = 0
                 } else {
                   document.querySelector(".alert3").style.display = "none"
                   document.querySelector(".checkmark1").style.color = "rgb(14, 240, 6)"
                   var userCheck = 1  
                 }

                 if (userPassword==oldpass) {
                  document.querySelector(".alert1").style.display = "none"
                  document.querySelector(".checkmark2").style.color = "rgb(14, 240, 6)"
                  var passCheck = 1
                 } else if (oldpass=='') {
                  document.querySelector(".alert1").style.display = "none"
                  document.querySelector(".checkmark2").style.color = "rgb(255, 0, 0)"
                 } else {
                  document.querySelector(".alert1").style.display = "block"
                  document.querySelector(".checkmark2").style.color = "rgb(255, 0, 0)"
                  var passCheck = 0
                 }

                 if (newpass=="") {
                  document.querySelector(".alert2").style.display = "none"
                  document.querySelector(".checkmark3").style.color = "rgb(255, 0, 0)"
                  var newpassCheck = 0
                 } else {
                  if (newpass.length < 8) {
                    document.querySelector(".alert2").style.display = "block"
                    document.querySelector(".checkmark3").style.color = "rgb(255, 0, 0)"
                    var newpassCheck = 0
                   }  else {
                    document.querySelector(".alert2").style.display = "none"
                    document.querySelector(".checkmark3").style.color = "rgb(14, 240, 6)"
                    var newpassCheck = 1
                   }
                 }

                 if (userCheck + passCheck + newpassCheck == 3) {
                  document.querySelector(".submitButtonDecoy").style.display = "none"
                  document.querySelector(".submitButton").style.display = "block"
                 } else {
                  document.querySelector(".submitButton").style.display = "none"
                  document.querySelector(".submitButtonDecoy").style.display = "inline-block"
                 }

                 document.getElementById('profileEditForm').addEventListener('submit', submitChanges);

                 function submitChanges(e) {
                  e.preventDefault()
                  if (userCheck==1, passCheck==1, newpassCheck==1) {

                    var ipAddressRef = database.ref('savedLocationData/' + ipAddress)
                      ipAddressRef.once('value', function(snapshot) {
                       if (snapshot.exists()) {
                       var userData = snapshot.val()
                       var userEmail = userData.email
                       var userNameIp = userData.name
                       var userPassword = userData.password
                       var userProfile = userData.profile
                       var userDOC = userData.doc
                       var userUid = userData.uid
                       var userProfile = userData.profile
                       var userTheme = userData.theme


                       var realDatabase = database.ref('users/' + userNameIp)
                       realDatabase.once('value', function(snapshot) {
                        if (snapshot.exists()) {
                        var userData = snapshot.val()
                        var userEmail = userData.email
                        var userName = userData.name
                        var userPassword = userData.password
                        var userProfile = userData.profile
                        var userDOC = userData.doc
                        var userUid = userData.uid
                        var userProfile = userData.profile
                        var userTheme = userData.theme
                        
                         if (userName==nametag) {

                          var newForm = firebase.database().ref('users/' + userNameIp)

                           newForm.set({
                             name: userNameIp,
                             email: userEmail,
                             password: newpass,
                             theme: userTheme,
                             doc: userDOC,
                             uid: userUid,
                             profile: userProfile
                           })

                           realDatabase.remove()

                         } else {

                           var newForm = firebase.database().ref('users/' + nametag)

                           newForm.set({
                             name: nametag,
                             email: userEmail,
                             password: newpass,
                             theme: userTheme,
                             doc: userDOC,
                             uid: userUid,
                             profile: userProfile
                           })

                           realDatabase.remove()

                         }
                       } else {}
                      })

                       ipAddressRef.update({
                        name: nametag,
                        password: newpass
                       }).then(()=>{
                        
                        window.location.href = "./index.html"
                      })
                       
                      

                      } else {}
                     })

                  }
                 }



              })

          } else {
            
          }
        })

      })
  }




  function closeNavForFullAccDetails() {

    document.querySelector(".overlayAccDetails").style.display = "none"

  }

  function openNavForFullAccDetails() {

    document.querySelector(".overlayAccDetails").style.display = "block"
    
  }
  

  function wallpaperSelection() {
    var wallpapers = [
      "https://images4.alphacoders.com/133/1332018.png", // Anime girl sunset
      "https://images3.alphacoders.com/133/1331008.png", // Anime girl bedroom
      "https://images6.alphacoders.com/133/1330094.png", // Landscape blue sky
    ]
  }


  