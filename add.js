function addToCart(itemName, price, imageUrl) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let existingItem = cart.find(item => item.name === itemName);
  if (existingItem) {
      existingItem.quantity += 1;
  } else {
      cart.push({
          name: itemName,
          price: price,
          quantity: 1,
          imageUrl: imageUrl
      });
  }
  
  // Calculate total amount
  let totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Store cart and total amount in local storage
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('itemTotal', itemTotal);

  window.location.href = 'cart.html';
}
