const stripe = require("stripe")(process.env.STRIPE_KEY);

const WebHook = async (req, res) => {
  let event = req.body;

  const signature = request.headers['stripe-signature'];
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      endpointSecret
    );
  } catch (error) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
  }

   // Handle the event
   switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('payment attached.....')
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send('event receives');
};

module.exports = {
  WebHook
};