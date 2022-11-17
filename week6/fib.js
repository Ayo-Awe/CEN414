/**
 * Get the fibonnaci of n via recursion
 * @param {number} n
 * @returns fibonnaci of n
 */
function fibRecursion(n) {
  // Base cases
  if (n <= 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  }

  // fib(3) = fib(2) + fib(1)
  return fibRecursion(n - 2) + fibRecursion(n - 1);
}

function fibTabulation(n) {
  const fibTable = [];

  for (let i = 0; i <= n; i++) {
    if (i == 0) {
      fibTable[i] = 0;
    } else if (i == 1) {
      fibTable[i] = 1;
    } else {
      fibTable[i] = fibTable[i - 1] + fibTable[i - 2];
    }
  }

  console.log(fibTable);
}
