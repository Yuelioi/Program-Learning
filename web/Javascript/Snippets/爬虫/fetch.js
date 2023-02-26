async function getJSON(url) {
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("Request Failed", error);
  }
}

getJSON("https://www.agemys.net/");
