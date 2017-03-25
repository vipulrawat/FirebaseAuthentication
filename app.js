(function(){
var config = {
  apiKey: "AIzaSyDwTU4-WmrrT7v7-etOkMWPKsXvlxewZEE",
  authDomain: "mark3-120c4.firebaseapp.com",
  databaseURL: "https://mark3-120c4.firebaseio.com",
  storageBucket: "mark3-120c4.appspot.com",
  messagingSenderId: "809274393226"
};
firebase.initializeApp(config);


const txtemail1=document.getElementById("email1");
const txtemail2=document.getElementById("email2");
const txtpass1=document.getElementById("pass1");
const txtpass2=document.getElementById("pass2");
const registerbtn=document.getElementById("registerbtn");
const user=document.getElementById("user");
const logoutbtn=document.getElementById("logoutbtn");
const authpage=document.getElementById("authpage");
const tabs=document.getElementById('tabs');
const status=document.getElementById('status');
const error=document.getElementById('error');
registerbtn.addEventListener('click', e => {
  const email1=txtemail1.value;
  const pass1=txtpass1.value;
  const auth=firebase.auth();
  const promise=auth.createUserWithEmailAndPassword(email1,pass1);
  promise.catch(e=> console.log(e.message));
});

loginbtn.addEventListener('click', e => {
  const email2=txtemail2.value;
  const pass2=txtpass2.value;
  const auth=firebase.auth();

  const promise=auth.signInWithEmailAndPassword(email2,pass2);
  promise.catch(e =>{
    error.classList.remove('hide');
    var msg=e.message;
    const errmsg=document.getElementById('error');
    errmsg.innerHTML=msg;
  });
});

logoutbtn.addEventListener('click',e=>{
  firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(firebaseUser =>{
  if(firebaseUser){
    var mail=firebaseUser.email;
    var displayName=firebaseUser.displayName;
    console.log('user logged in');
    user.classList.remove('hide');
    authpage.classList.add('hide');
    tabs.classList.add('hide');
    status.innerHTML="Welcome back:"+mail;
  }
  else{
    console.log('user logged out');
    user.classList.add('hide');
    authpage.classList.remove('hide');
    tabs.classList.remove('hide');
  }
  });

  //GOOGLE AUTHENTICATION STARTS HERE
  const google=document.getElementById('googlebtn');
  google.addEventListener('click', e => {
    var provider=new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/plus.login');

    firebase.auth().signInWithPopup(provider).then(function(result){
      var token=result.credential.accessToken;
      var user=result.user;
      //changes
      alert('logged in successfully using google');
    });
  });
  //GOOGLE AUTHENTICATION ENDS HERE


  //FACEBOOK AUTHENTICATION STARTS HERE
  const facebook=document.getElementById('facebookbtn');
  facebook.addEventListener('click',e=>{
    var provider=new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase.auth().signInWithPopup(provider).then(function(result){
      var token=result.credential.accessToken;
      var user=result.user;
      //changes
      alert('logged in successfully using facebook');
    }).catch(function(error){
      var errcode=error.code;
      var errmsg=error.message;

      console.log('ERRORRRR'+errmsg);
    });
  });

  //FACEBOOK SDK STARTS HERE

  window.fbAsyncInit = function() {
   FB.init({
     appId      : '1864885513767012',
     xfbml      : true,
     version    : 'v2.8'
   });
   FB.AppEvents.logPageView();
 };

 (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  //FACEBOOK SDK ENDS HERE
  //FACEBOOK AUTHENTICATION ENDS HERE

}());
