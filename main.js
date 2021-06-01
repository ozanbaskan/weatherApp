var api = "https://weather-proxy.freecodecamp.rocks/api/current?";

function supportsGeolocation() {
  return "geolocation" in navigator;
}

$(document).ready(function () {
  if (supportsGeolocation()) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $("#location").text("Geolocation is not supported by this browser.");
    console.log("Geolocation is not supported by this browser.");
  }
});

const computeBackgroundGradient = (temp) => {
  return `linear-gradient( 0deg, rgba(0, 0, 0, 1) -30%, rgba(${
    temp * 5 || 255
  }, 0, ${255 - temp * 5 || 0}, 1) 100%)`;
};
const computeBackgroundColor = (temp) => {
  return `rgba(${temp * 4 || 255}, 0, ${255 - temp * 4 || 0}, 1)`;
};

const computeTextColor = (temp) => {
  return `rgba(${255 - temp * 4 || 0}, 255, ${temp * 4 || 255}, 1)`;
};
//let lat = 41.28667;
//let lng = 36.33;
const showPosition = (position) => {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  $.get(api + "lat=" + lat + "&lon=" + lng, function (data) {
    const name = data.name;
    const image = data.weather[0].icon;
    const weatherDescription = data.weather[0].description;
    const temp = Math.round(data.main.temp * 10) / 10;
    const country = data.sys.country;
    if (!name) return;

    $("#weather").text(weatherDescription);
    $("#icon").attr("src", image);
    $("#icon").attr("title");
    $("#location").text(`${name} - ${country}`);
    $("#temp").text(temp + "°C");
    $("html").css({
      background: computeBackgroundGradient(temp),
    });
    $("body").css({
      background: computeBackgroundGradient(temp),
    });
    $("footer").css({
      color: computeTextColor(temp),
    });
    $("#frame").css({
      backgroundColor: computeBackgroundColor(temp),
      color: computeTextColor(temp),
    });
  });
};
