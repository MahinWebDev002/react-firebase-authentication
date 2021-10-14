import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,sendEmailVerification,sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react/cjs/react.development';
import './App.css';
import initializeAuthentication from './Firebase/firebase.init';
initializeAuthentication()


function App() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState(' ')
  const [password,setPassword]=useState('')
  const [isLogin,setIsLogin]=useState(false)
  const [error,setError]=useState('')


 const auth=getAuth()
 const toggleLogin=e=>{
   setIsLogin(e.target.checked)
 }
 const handleNameChange=e=>{
   setName(e.target.value)
 }
 const handleEmailChange=e=>{
   setEmail(e.target.value)
 }
 const handlePasswordChange=e=>{
   setPassword(e.target.value)
 }
 const handleRegistration=e=>{
  e.preventDefault();
   if(password.length < 6){
     setError('Password Must be at least 6 characters long.')
     return;
   }
   if (!/(?=.*[A-Z].*[A-Z])/.test(password)){
     setError('Password must contain 2 Upper case');
     return;
   }
   if(isLogin){
     processLogin(email,password)
   }
   else{
     registerNewUser(email,password)
   }
 }
 const registerNewUser=(email,password)=>{
   createUserWithEmailAndPassword(auth,email,password)
   .then(result=>{
     const user=result.user
     console.log(user);
     setUserName()
     verifyEmail()
     setError('')
     console.log(user);
   })
   .catch(error=>{
     setError(error.message)
   })
 }
 const processLogin=(email,password)=>{
  signInWithEmailAndPassword(auth,email,password)
  .then(result=>{
    const user=result.user
    setError('')
    console.log(user);
  }).catch(error => {
    setError(error.message);
  })
 }
 const setUserName=()=>{
  updateProfile(auth.currentUser, {displayName:name})
    .then(result=>{ })
 }
 const verifyEmail=()=>{
  sendEmailVerification(auth.currentUser)
  .then(result=>{ })
 }
 const handleResetPassword=()=>{
  sendPasswordResetEmail(auth,email)
  .then(()=>{ }).catch(error => {
    setError(error.message);
  })
 }

  return (
    <div className='mx-5 mt-5'>
      <form onSubmit={handleRegistration}>
        <h2>Please {isLogin?'Login':'Registration'}</h2>
  {!isLogin && <div className="row mb-3">
    <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
    <div className="col-sm-10">
      <input type="text" onBlur={handleNameChange} placeholder='Your Name' className="form-control" id="inputName" required/>
    </div>
  </div>}
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required/>
    </div>
  </div>
  <div className="row mb-3 text-danger"><h4>{error}</h4></div>
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1"/>
        <label className="form-check-label" htmlFor="gridCheck1">
          Already Registered!
        </label>
      </div>
    </div>
  </div>
  
  <button type="submit" className="btn btn-primary">
    {!isLogin?'Sign up':'Sign in'}
  </button>
  <br /><br />
  <button onClick={handleResetPassword} type="button" className="btn btn-secondary btn-sm">Reset Your Password</button>
</form>
    </div>
  );
}

export default App;
