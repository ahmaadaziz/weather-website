const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const paragraph1 = document.querySelector("#p1");
const paragraph2 = document.querySelector("#p2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent Reloading which is the default behaviour
  const location = search.value;

  paragraph1.textContent =
    "Getting weather forecast please hold on to your horses...";
  paragraph2.textContent = "";

  fetch(`/weather?address=${location}`).then((respponse) => {
    respponse.json().then((data) => {
      if (data.error) {
        paragraph1.textContent = data.error;
        paragraph2.textContent = "";
      } else {
        paragraph2.textContent = data.data.forecast;
        paragraph1.textContent = data.data.location;
        //data.address.charAt(0).toUpperCase() + data.address.slice(1);
      }
    });
  });
});
