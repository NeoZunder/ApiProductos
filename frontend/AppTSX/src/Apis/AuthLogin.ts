const functionLogin = async () => {  
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!username || !password) {
        console.error("Please fill in all fields");
        return;
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
        console.error(data.message || "Login failed");
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

  if (!username || !password || !rePassword) {
    alert("Please fill in all fields");
    return;
  }

  if (password !== rePassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert("User registered successfully, you can now login");
      // Opcional: limpiar inputs o cambiar tab a login
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("There was an error connecting to the server.");
  }
};

export { functionLogin, functionRegister };
