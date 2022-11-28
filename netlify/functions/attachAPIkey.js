const { default: axios } = require("axios");
require("dotenv").config();

const handler = async (event, context, callback) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  console.log("API_KEY", API_KEY);
  const { url } = JSON.parse(event.body);
  console.log("req.body= ", JSON.parse(event.body));
  if (!url) {
    return {
      statusCode: "400",
      body: "make sure to add URL with the request's body.",
    };
  }
  const urlWithKey = `${url}&apiKey=${API_KEY}`;
  console.log("calling url with key: ", urlWithKey);

  let config = {
    method: "get",
    url: urlWithKey,
    headers: { "accept-encoding": "*" },
  };
  try {
    const response = await axios(config);
    const result = response.data;
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: `could not make call! ${e.message}`,
    };
  }
};

module.exports = { handler };
