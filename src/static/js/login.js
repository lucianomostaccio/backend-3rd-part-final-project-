const formLogin = document.querySelector("form");

formLogin?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const response = await fetch("/api/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    // @ts-ignore
    body: new URLSearchParams(new FormData(formLogin)),
  });

  if (response.status === 201) {
    const session = await response.json();
    // alert(JSON.stringify(session)); will show the whole session object, including payload
    alert(session.message); // will show only the message
    window.location.href = "/products";
  } else if (response.status === 401) {
    alert("Invalid credentials");
  } else {
    const error = await response.text();
    alert(`Error: ${error}`);
  }
});
