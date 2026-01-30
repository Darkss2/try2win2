export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const event = req.body;

    // 🔒 Optional but recommended later:
    // verify signature here

    console.log("Chargily webhook received:", event);

    // Example event types (depends on Chargily)
    // payment.success
    // payment.failed

    if (event.type === "payment.success") {
      const paymentId = event.data.id;

      // ✅ TODO:
      // - mark order as paid
      // - save to DB
      // - unlock product
      // - send email
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ error: "Webhook failed" });
  }
}
