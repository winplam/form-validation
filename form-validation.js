const error = document.querySelectorAll('.error')
const inputs = document.querySelectorAll('input')
const form = document.getElementsByTagName('form')[0]
const submit = form.querySelector('input[type="submit"]')
let submitFlag = false

inputs.forEach((input, index) => {
  input.addEventListener('input', function (event) {checkInput(event, index)})
})
form.addEventListener('submit', function (event) {checkForm(event) })
submit.addEventListener('mousedown', function (event) {submitBeforeBlur(event)})

// Check email address input
form[0].addEventListener('blur',
  function (event) {
    checkMatch(event.target, inputs[1], 1, 'Email address does not match.')
  })
// Check email confirmation
form[1].addEventListener('blur', function (event) {
  checkMatch(inputs[0], event.target, 1,
    'Email address does not match.')
})
// Check password input
form[4].addEventListener('blur',
  function (event) {
    checkMatch(event.target, inputs[5], 5, 'Passwords do not match.')
  })
// Check password confrimation
form[5].addEventListener('blur', function (event) {
  checkMatch(inputs[4], event.target, 5,
    'Passwords do not match.')
})

// Check input and display validation message
function checkInput(event, index) {
  console.log(`Input ${index}: ${event.target.value}`)
  if (event.target.validity.valid) {
    error[index].innerHTML = ''
    error[index].className = 'error'
  } else {
    error[index].innerHTML = inputs[index].validationMessage
    error[index].className = 'error active'
  }
}

// Compare input and confirmation for match
function checkMatch(input, confirmation, confirmationIndex, message) {
  if (input.value === confirmation.value) {
    inputs[confirmationIndex].setCustomValidity('')
    error[confirmationIndex].innerHTML = ''
    error[confirmationIndex].className = ''
  } else if (inputs[confirmationIndex].value != '') {
    inputs[confirmationIndex].setCustomValidity(message)
    error[confirmationIndex].innerHTML = inputs[confirmationIndex].validationMessage
    error[confirmationIndex].className = 'error active'
  }
  if (submitFlag) submit.click()
}

// Check all inputs upon clicking submit button
function checkForm(event) {
  console.log('submit event ' + event)
  let valid = true
  inputs.forEach((input, index) => {
    if (!input.validity.valid) {
      valid = false
      console.log('invalid input submitted')
      error[index].innerHTML = input.validationMessage
      error[index].className = 'error active'
    }
  })
  if (valid) {
    alert('Hi Five! You completed the form with all valid input.')
  } else {
    event.preventDefault()
  }
}

// Activate submit button if blocked by blur event
function submitBeforeBlur(event) {
  submitFlag = true
}