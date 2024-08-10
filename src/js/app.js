import { right } from "@popperjs/core";
import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // Aquí creamos las URLs de búsqueda para cada red social
  const twitterSearch = variables.twitter
    ? `https://twitter.com/search?q=${encodeURIComponent(variables.twitter)}`
    : "https://x.com/4geeksacademyES";
  const githubSearch = variables.github
    ? `https://github.com/search?q=${encodeURIComponent(variables.github)}`
    : "https://github.com/4GeeksAcademy";
  const linkedinSearch = variables.linkedin
    ? `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(
        variables.linkedin
      )}`
    : "https://www.linkedin.com/school/4geeks-academy-latino/";
  const instagramSearch = variables.instagram
    ? `https://www.instagram.com/explore/tags/${encodeURIComponent(
        variables.instagram
      )}/`
    : "https://www.instagram.com/4geeksacademylatam/";

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${variables.name ? variables.name : "Name"} ${
    variables.lastName ? variables.lastName : "LastName"
  }</h1>
          <h2>${variables.role ? variables.role : "Role"}</h2>
          <h3>${variables.city ? variables.city : "City"}, ${
    variables.country ? variables.country : "Country"
  }</h3>
          <ul class="${variables.socialMediaPosition}">
            <li><a href="${twitterSearch}" target="_blank"><i class="fab fa-twitter"></i></a></li>
            <li><a href="${githubSearch}" target="_blank"><i class="fab fa-github"></i></a></li>
            <li><a href="${linkedinSearch}" target="_blank"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="${instagramSearch}" target="_blank"><i class="fab fa-instagram"></i></a></li>
          </ul>
  </div>`;
}

window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-left",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
