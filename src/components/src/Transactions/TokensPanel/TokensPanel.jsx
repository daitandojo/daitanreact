import { useState, useEffect } from "react";
import { useProvider } from "../../../contexts/ProviderContext";
import { useUser, useSession, useLanguage } from "myreact";
import words from "./TokensPanel-language.js";
import ControlledOpenSelect from "./ControlledOpenSelect";
import ModelRadioGroup from "./ModelRadioGroup";
import StripePayment from "./StripePayment";
import { Button } from "myreact";
import { query } from "daitanjs/apiqueries";
import { PanelContainer, TokensTitle, Tokens } from "./TokensPanel-styles.jsx";
import { updateProviderInDB } from "../../../helpers/providers";

export default function TokensPanel({ onPaid }) {
  const { currentLanguage } = useLanguage();
  const { setSnackbarText } = useSession();
  const { user, setUser } = useUser();
  const { provider, setProvider } = useProvider();
  const [displayedTokens, setDisplayedTokens] = useState(provider.tokens);

  const [product, setProduct] = useState(0);
  const [showStripe, setShowStripe] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setDisplayedTokens(provider.tokens);
  }, [provider.tokens]);

  function createProduct(quantity, price, currency = "EUR", objective = "") {
    return {
      description: `${quantity}-pack Haelpers tokens`,
      quantity,
      price,
      currency,
      objective,
    };
  }

  var productSet = [
    createProduct(10, 1.7),
    createProduct(30, 1.55),
    createProduct(50, 1.5),
    createProduct(100, 1.45),
    createProduct(250, 1.4),
  ];

  const selectedProduct = productSet[product];

  const comment = words.ThankYouForPurchasing[currentLanguage]
    .replace("{{quantity}}", selectedProduct.quantity)
    .replace("{{totalPrice}}", selectedProduct.price * selectedProduct.quantity)
    .replace(new RegExp("{{currency}}", "g"), selectedProduct.currency)
    .replace("{{pricePerToken}}", selectedProduct.price);

  const handlePurchaseClick = async (product) => {
    try {
      const response = await query("POST", "stripe/create-payment-intent", {
        amount: selectedProduct.price * 100,
        currency: "EUR",
      });
      setClientSecret(response.clientSecret);
      setShowStripe(true);
    } catch (error) {
      console.error("Error creating PaymentIntent:", error);
      setErrorMessage("Failed to initialize payment. Please try again.");
    }
  };

  const extractPaymentIntentId = (clientSecret) => {
    return clientSecret.split("_secret")[0];
  };

  const createTransaction = async (selectedProduct, paymentDetails) => {
    const transactionid = paymentDetails.paymentIntent.id;
    const newTransaction = {
      transactionid,
      type: "Credit",
      tokens: selectedProduct.quantity,
      amount: selectedProduct.price * selectedProduct.quantity,
      currency: selectedProduct.currency,
      objective: "Token Purchase",
    };

    try {
      const transaction = await query(
        "POST",
        "transactions/create",
        newTransaction
      );
      return transaction;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  };

  const animateTokenCount = (oldCount, newCount) => {
    return new Promise((resolve) => {
      const delta = newCount - oldCount;
      const duration = 3000; // 3 seconds
      const increment = delta / (duration / 100); // Increment every 100ms

      let currentCount = oldCount;
      const intervalId = setInterval(() => {
        currentCount += increment;
        if (currentCount >= newCount) {
          clearInterval(intervalId);
          setDisplayedTokens("🙏"); // Display thank you emoji
          setTimeout(() => {
            setDisplayedTokens(Math.round(newCount)); // Revert to final token count after 700ms
            resolve(); // Resolve the promise here
          }, 700);
        } else {
          setDisplayedTokens(Math.round(currentCount));
        }
      }, 100);
    });
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    setShowStripe(false);
    try {
      const paymentIntentId = extractPaymentIntentId(clientSecret);

      const paymentStatus = await query(
        "GET",
        `stripe/payment_intents/status/${paymentIntentId}`
      );

      if (paymentStatus.success) {
        const selectedProduct = productSet[product];
        const transaction = await createTransaction(
          selectedProduct,
          paymentDetails
        );
        const amendedTokens = provider.tokens + transaction.tokens;
        const updatedProvider = {
          ...provider,
          tokens: amendedTokens,
          transactions: [...provider.transactions, transaction],
        };
        await animateTokenCount(provider.tokens, amendedTokens);
        setProvider(updatedProvider);
        updateProviderInDB(updatedProvider);
        setUser({ ...user, provider: updatedProvider });
        setSnackbarText(words.ThankYou[currentLanguage] + " 🙏");
        onPaid(amendedTokens);
      } else {
        setErrorMessage("Payment failed or is incomplete. Please try again.");
      }
    } catch (error) {
      console.log("Error in handling payment success:", error);
      setErrorMessage("An error occurred during payment processing.");
    }
  };

  return (
    <>
      <PanelContainer>
        <TokensTitle>{words.YourTokens[currentLanguage]}</TokensTitle>
        <Tokens>{displayedTokens}</Tokens>
        <ControlledOpenSelect
          productSet={productSet}
          product={product}
          setProduct={setProduct}
        />
        <Button
          label={words.AddTokens[currentLanguage]}
          onClick={() => handlePurchaseClick(product)}
        />
        <ModelRadioGroup provider={provider} setProvider={setProvider} />
      </PanelContainer>
      {showStripe && (
        <StripePayment
          comment={comment}
          clientSecret={clientSecret}
          onPaymentSuccess={handlePaymentSuccess}
          onClose={() => setShowStripe(false)}
        />
      )}
    </>
  );
}
