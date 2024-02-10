const formLogout = document.querySelector("#form-logout");

formLogout?.addEventListener("submit", async (event) => {
  event.preventDefault();
  alert("session closed successfully");
  try {
    const response = await fetch("/api/sessions/current", {
      method: "DELETE",
    });

    if (response.status === 204) {
      // session closed successfully, redirect to login
      window.location.href = "/login";
    } else {
      // in case of errors:
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error("Error closing the session:", error);
  }
});