// FORM VALIDATION
let password =document.querySelector('.passy')
let email =document.querySelector('.emaily')
let error =document.querySelector('.danger')
let errorPass =document.querySelector('.passDanger')
let btn = document.querySelector('.form-btn')
const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    btn.addEventListener('click', (e)=>{
    if(email.value === ''){
        error.innerHTML = 'Email is required!';
		email.style.borderColor = 'red'
		email.focus()
		e.preventDefault()
    }
else if (!regex.test(email.value)) {
      error.innerHTML = "This is not a valid email format!"
	  e.preventDefault()
  }
  else{
	error.innerHTML = ' ';
	email.style.borderColor = 'green'
	
  }
  if(password.value === ''){
    errorPass.innerHTML = 'password is required';
    password.style.borderColor = 'red'
    password.focus()
    e.preventDefault()
}
  else if(password.length.value <= 3 || password.length.value > 12){
    errorPass.innerHTML = 'password must be grater than 3 or less than 12';
    password.style.borderColor = 'red'
    password.focus()
    e.preventDefault()
}
else{
    errorPass.innerHTML = ' ';
    password.style.borderColor = 'green'
    
    
  }
  
    })