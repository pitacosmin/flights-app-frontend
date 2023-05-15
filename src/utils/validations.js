function validateEmail(email) {
  // Regular expression to validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validatePassword(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const isLongEnough = password.length >= 8;

  return (
    hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough
  );
}

export { validateEmail, validatePassword };
