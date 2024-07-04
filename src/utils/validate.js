export const checkValidEmailFeild = (email) => {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    if(!isEmailValid) return "Email is not valid";
    return null;
}

export const checkValidPasswordFeild = (password) => {
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(password);
    if(!isPasswordValid) return "password is not valid";
    return null;
}