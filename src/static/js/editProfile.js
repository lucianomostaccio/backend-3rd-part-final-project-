// @ts-ignore
const formEditProfile = document.querySelector("#form-edit-profile");
const inputs = document.querySelectorAll("input");

window.addEventListener("load", async (event) => {
  const response = await fetch("/api/users/current");
  if (response.status === 403) {
    alert("You need to be logged in to modify your profile");
    return (window.location.href = "/login");
  }

  const result = await response.json();
  const user = result.payload;

  inputs[0].value = user.first_name;
  inputs[1].value = user.last_name;
  inputs[2].value = user.email;
  inputs[3].value = user.age;
});

formEditProfile?.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    // @ts-ignore
    const formData = new FormData(formEditProfile);
    formData.append("email", inputs[2].value);

    // @ts-ignore
    const body = formData;

    const response = await fetch("/api/users/edit", {
      method: "PUT",
      body,
    });

    if (response.status === 200) {
      alert("Profile updated successfully");
      window.location.href = "/profile";
    } else {
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error("Error during profile update:", error);
    alert("An error occurred during profile update. Please try again later.");
  }
});

function previewImage() {
  let preview = document.querySelector("#imagePreview");
  let fileInput = document.querySelector("#newProfilePicture");
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
