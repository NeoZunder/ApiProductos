
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const functionSaveNewPassword = async function functionSaveNewPassword(token: string, password: string, repeatPassword: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/email/forgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password, repeatPassword }),
    });

    const data = await res.json();
    return data.message;
  } catch (error) {
    console.error("Error saving new password:", error);
    return "Error updating the password. Please try again.";
  }
}

const functionResetPassword = async() => {
    const email = (document.getElementById("email") as HTMLInputElement).value;

    if (!email) {
      return ("Please enter your email")
    }

    try {
      const response = await fetch(`${API_BASE_URL}/email/resetPassword`, {
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
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.status === 200) {
        console.log(data.message);
        window.location.href = "/Home";
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
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password, rePassword, email })
    });

    const data = await response.json();

    if (response.ok) {
      alert("User registered successfully, you can now login");
      (document.getElementById("reg-username") as HTMLInputElement).value = "";
      (document.getElementById("reg-password") as HTMLInputElement).value = "";
      (document.getElementById("reg-re-password") as HTMLInputElement).value = "";
      (document.getElementById("reg-email") as HTMLInputElement).value = "";
    } else {
      return (data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("There was an error connecting to the server.");
  }
};

export { functionLogin, functionRegister, functionResetPassword, functionSaveNewPassword };
