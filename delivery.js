document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('deliveryForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Retrieve selected payment method
        const selectedPaymentMethod = document.querySelector('input[name="choice"]:checked');

        if (!selectedPaymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        // Redirect based on the selected payment method
        const paymentMethod = selectedPaymentMethod.value;
        if (paymentMethod === 'cod') {
            window.location.href = 'cash_on_delivery.html'; // Redirect to Cash on Delivery page
        } else if (paymentMethod === 'net') {
            window.location.href = 'net_banking.html'; // Redirect to Net Banking page
        } else if (paymentMethod === 'credit') {
            window.location.href = 'card_payment.html'; // Redirect to Credit Card page
        }
    });
});
