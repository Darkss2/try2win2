export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const { amount, color } = req.body || {};

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Chargily TEST endpoint
    const chargilyUrl = "https://pay.chargily.net/api/v2/checkouts";

    const response = await fetch(chargilyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CHARGILY_API_KEY}`,
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: "dzd",
        description: `Color purchase: ${color}`,
        success_url: `${req.headers.origin}/success.html`,
        failure_url: `${req.headers.origin}/cancel.html`
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json(data);
    }

    return res.status(200).json({
      url: data.checkout_url
    });

  } catch (error) {
    return res.status(500).json({
      error: "Payment creation failed",
      details: error.message
    });
  }
}
