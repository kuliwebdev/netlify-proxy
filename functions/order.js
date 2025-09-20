exports.handler = async function(event, context) {
  // ✅ handle preflight (OPTIONS)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: ""
    };
  }

  try {
    // forward request ke Google Apps Script
    const result = await fetch("https://script.google.com/macros/s/AKfycbxD043F1FOvCWL8JWmqRrRcEzhGHkzV-bA7Iu0Ieu3nTbbh9uWKmq05khv3OzLoZlSnJA/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body
    });

    const data = await result.text();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.toString() })
    };
  }
};
