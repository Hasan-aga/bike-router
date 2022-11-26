import { Handler } from "@netlify/functions";

interface MyData {
  name: string;
}
const handler: Handler = async (event, context) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const { name } = event.queryStringParameters as any as MyData;
  const url = `https://api.geoapify.com/v1/geocode/search?text=${name}&format=json&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);

    return {
      statusCode: 200,
      body: JSON.stringify(await response.json()),
    };
  } catch (e) {
    console.log(e);

    return {
      statusCode: 404,
      body: JSON.stringify(await e),
    };
  }
};

export { handler };
