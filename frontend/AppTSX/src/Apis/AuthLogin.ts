
const functionResetPassword = async() => {
    const email = (document.getElementById("email") as HTMLInputElement).value;

    if (!email) {
      return ("Please enter your email")
    }

    try {
      const response = await fetch("/api/email/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      return data.message || "Reset password request failed"
    } catch (error) {

      return ("There was an error. Please try again.")
    }
}

const functionLogin = async () => {  
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!username || !password) {
        return ("Please fill in all fields");
    }

    try {
    const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.status === 200) {
        console.log(data.message);
        window.location.href = "/home";
    } else {
        return data.message || "Login failed";
    }
    } catch (error) {
        console.error("Error during login:", error);
        alert("There was an error connecting to the server.");
    }

}

const functionRegister = async () => {
  const username = (document.getElementById("reg-username") as HTMLInputElement)?.value;
  const password = (document.getElementById("reg-password") as HTMLInputElement)?.value;
  const rePassword = (document.getElementById("reg-re-password") as HTMLInputElement)?.value;
  const email = (document.getElementById("reg-email") as HTMLInputElement)?.value;

  if (!username || !password || !rePassword || !email) {
    // Si alguno de los campos está vacío, muestra un mensaje de error
    return ("Please fill in all fields");
    
  }

  if (password !== rePassword) {
    return ("Passwords do not match");
  }

  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password, email })
    });

    const data = await response.json();

    if (response.ok) {
      alert("User registered successfully, you can now login");
      // Opcional: limpiar inputs o cambiar tab a login
    } else {
      return (data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("There was an error connecting to the server.");
  }
};

export { functionLogin, functionRegister, functionResetPassword };
