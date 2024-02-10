// @ts-ignore
const formRegister = document.querySelector("form");

formRegister?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const response = await fetch("/api/users", {
    method: "POST",
    // @ts-ignore
    body: new FormData(formRegister),
  });

  if (response.status === 201) {
    // @ts-ignore
    // @ts-ignore
    const { payload: user } = await response.json();
    alert("Registration successful");
    window.location.href = "/login";
  } else {
    const error = await response.json();
    alert(error.message);
  }
});

function previewImage() {
  let preview = document.querySelector("#imagePreview");
  let fileInput = document.querySelector(".profile_picture");
  let footer = document.querySelector("#footer");
  // @ts-ignore
  footer.style.position = "static";
  // @ts-ignore
  footer.style.bottom = " ";
  // @ts-ignore
  let file = fileInput.files[0];

  let reader = new FileReader();

  reader.onloadend = function () {
    // @ts-ignore
    preview.innerHTML =
      '<img class="profile_picture" src="' + reader.result + '" alt="Preview">';
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    // @ts-ignore
    preview.innerHTML = "";
  }
}
