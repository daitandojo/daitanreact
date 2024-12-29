import React from "react";

import { Stripe } from "myreact";

import { StripeModal, StripeContent, CloseButton } from "./TokensPanel-styles";

function StripePayment({
  comment,
  clientSecret,
  onClose,
  onPaymentSuccess,
  // provider,
  // selectedProduct
}) {
  return (
    <StripeModal>
      <StripeContent>
        <Stripe
          comment={comment}
          clientSecret={clientSecret}
          onPaymentSuccess={onPaymentSuccess}
        />
        <CloseButton onClick={onClose}>X</CloseButton>
      </StripeContent>
    </StripeModal>
  );
}

export default StripePayment;
