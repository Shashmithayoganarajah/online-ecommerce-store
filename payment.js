document.addEventListener('DOMContentLoaded', function() {
    const totalAmount = parseFloat(localStorage.getItem('total'));
    if (!isNaN(totalAmount)) {
        document.getElementById('totalAmount').textContent = 'Rs. ' + totalAmount.toFixed(2);
    } else {
        console.log("Total amount is not available or invalid.");
    }
});

function confirmPayment(paymentMethod) {
    alert("Payment confirmed using " + paymentMethod);
    // Optionally, perform additional actions like clearing the cart, etc.
}
