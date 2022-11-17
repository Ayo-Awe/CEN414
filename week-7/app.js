// $(function () {
//   console.log("jquery fired");
//   $("#div1").html("Hello world");
// });

const prod = "somset";
const quan = 31;

const products = [
  { product: "somet", quantity: 3 },
  { product: "sokjimet", quantity: 22 },
  { product: "somset", quantity: 31 },
  { product: "somefiet", quantity: 32 },
];

const result = products.find(
  (product) => product.product === prod && product.quantity === quan
);

result.quantity += 1;

console.log(result);

console.log(products);
