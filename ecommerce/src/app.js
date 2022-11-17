const products = [
  {
    name: "Xbox Controller",
    id: "48934fs",
    image: "../public/images/xbox-controller.jpg",
    price: 25,
  },
  {
    name: "Xbox",
    id: "dfhew832",
    image: "../public/images/download.jpg",
    price: 200,
  },
  {
    name: "X-Men Comic Book",
    id: "8923jefj",
    image: "../public/images/x-men.jpg",
    price: 5,
  },
  {
    name: "Xylophone",
    id: "jfie8329",
    image: "../public/images/xylophone.jpg",
    price: 125,
  },
  {
    name: "XXL Shirts",
    id: "fdshd323",
    image: "../public/images/xlshirt.jpg",
    price: 15,
  },
];

$(function () {
  products.forEach((product) => {
    let divProduct = $("<div>");
    divProduct.addClass("product");
    divProduct.append(`<img class="h-44 m-auto" src="${product.image}"/>`);

    let productInfo = $("<div>");
    productInfo.addClass("product-info");
    productInfo.append(`<span class="font-bold">$${product.price}</span>`);
    productInfo.append(`<span>${product.name}</span>`);
    productInfo.append(
      `<button data-product-id= "${product.id}" class="add-to-cart">Add</button>`
    );

    divProduct.append(productInfo);

    $(".product-section").append(divProduct);
  });

  $(".add-to-cart").click((e) => {
    addToCart(e.currentTarget.dataset.productId);
  });

  LoadCart();

  $(".negative").click((e) => {
    // Get product-id data attribute from data
    const { productId } = e.currentTarget.dataset;
    reduceInCart(productId);

    updateCartItem(productId);
  });

  $(".positive").click((e) => {
    // Get product-id data attribute from data
    const { productId } = e.currentTarget.dataset;
    addToCart(productId);

    updateCartItem(productId);
  });

  $("#checkout").click((e) => {
    const total = getCartTotal();

    if (total === 0) {
      alert("Your cart is empty, redirecting to home page");
      setTimeout(() => {
        window.location = "index.html";
      }, 500);
      return;
    }

    const message = `You've successfully purchase $${total} worth of items`;

    alert(message);

    clearCart();

    setTimeout(() => {
      window.location = "index.html";
    }, 500);
  });
});

function LoadCart() {
  const savedCart = localStorage.getItem("cart");

  const cart = savedCart ? JSON.parse(savedCart) : [];

  cart.forEach((item) => {
    const $item = $("<div>").addClass("cart-item");
    $item.attr("data-product-id", item.id);
    $item.append(`<img class="h-16 w-auto" src="${item.image}" alt="" />`);
    $item.append(`<span>${item.name}</span>`);
    $item.append(
      `<button data-product-id="${item.id}" class="operator-btn negative">-</button>`
    );
    $item.append(`<span data-product-id="${item.id}" >${item.quantity}</span>`);
    $item.append(
      `<button data-product-id="${item.id}" class="operator-btn positive">+</button>`
    );
    $item.append(
      `<h2 data-product-id="${item.id}" >$${item.quantity * item.price}</h2>`
    );

    $(".cart-items").append($item);
  });

  const cartTotal = cart.reduce((prev, item) => {
    return prev + item.quantity * item.price;
  }, 0);

  const $total = $("<div>");
  $total.addClass("total-section mt-3");
  $total.append("<span>Total</span>");
  $total.append(`<span id="total">$${cartTotal}</span>`);
  $total.append(
    `<button id="checkout" class="add-to-cart col-span-2 col-start-5">Checkout</button>`
  );
  $(".cart-items").append($total);
}

function addToCart(productId) {
  // Get cart from local storage
  const cart = getCart();

  // Get index of product in cart
  const index = cart.findIndex((product) => {
    return product.id == productId;
  });

  // If product isn't in cart, add to cart else increase quantity
  if (index === -1) cart.push({ ...getProduct(productId), quantity: 1 });
  else cart[index].quantity++;

  // Update local storage with new cart state
  setCart(cart);
}

function reduceInCart(productId) {
  // Get cart from local storage
  const cart = getCart();

  // Get index of product in cart
  const index = cart.findIndex((product) => {
    return product.id === productId;
  });

  // If product exist in cart decrement quantity
  if (index !== -1) {
    // If product quantity is greater than one decrement quantity else delete from cart
    if (cart[index].quantity !== 1) cart[index].quantity--;
    else {
      // Prompt user to confirm deletion
      const isDelete = confirm(
        `Are you sure you want to remove ${cart[index].name} from cart`
      );

      // Delete product from cart if user clicked ok
      if (isDelete) cart.splice(index, 1);
    }
  }

  setCart(cart);
}

/**
 * Synchronises the value of cart in local storage with the values displayed in the cart.html file
 * @param {*} productId
 */
function updateCartItem(productId) {
  // Get current cart state
  const cart = getCart();

  // Find index of product in cart
  const index = cart.findIndex((product) => {
    return product.id == productId;
  });

  // If product doesn't exist delete it from cart
  if (index === -1) $(`.cart-item[data-product-id="${productId}"]`).remove();
  else {
    // Update the cart item amount and quantity on the cart.html page
    const $quantity = $(`span[data-product-id='${productId}']`);
    $quantity.text(cart[index].quantity);
    const $amount = $(`h2[data-product-id='${productId}']`);
    $amount.text("$" + cart[index].price * cart[index].quantity);
  }

  // Calculate cart total
  const cartTotal = cart.reduce((prev, item) => {
    return prev + item.quantity * item.price;
  }, 0);

  // Update the total value
  $("#total").text("$" + cartTotal);
}

/**
 * Returns the product with id of productId
 * @param {string} productId Unique product identifier
 * @returns Product object if product exists else Null
 */
function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

/**
 * Gets the cart from local storage
 * @returns An array representing the cart
 */
function getCart() {
  // Get cart from local storage
  const storedCart = localStorage.getItem("cart");

  // If cart doesn't exist in local storage return an empty array
  // else parse cart into a js object
  const cart = storedCart ? JSON.parse(storedCart) : [];

  return cart;
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCartTotal() {
  const cart = getCart();

  // Calculate cart total
  const sum = cart.reduce(
    (sum, current) => sum + current.price * current.quantity,
    0
  );

  return sum;
}

function clearCart() {
  // Reset local storage cart
  setCart([]);

  // Clear rendered cart items
  $(".cart-item").remove();

  $("#total").text(`$${getCartTotal()}`);
}
