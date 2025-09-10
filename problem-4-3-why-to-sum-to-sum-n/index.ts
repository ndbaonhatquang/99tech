// Provide 3 unique implementations of sum_to_n in TypeScript.

// Iterative approach
// Time: O(n) — single pass from 1 to n
// Space: O(1) — constant extra memory
export function sumToNIterative(n: number): number {
  if (n <= 0 || !Number.isFinite(n)) {
    return 0
  };
  
// let sum = 0;
//   for (let i = 1; i <= n; i += 1) {
//     sum += i;
//   }
  return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, val) => acc + val, 0);
}

// Arithmetic series formula approach
// Time: O(1) — constant time arithmetic
// Space: O(1) — constant extra memory
export function sumToNFormula(n: number): number {
  if (n <= 0 || !Number.isFinite(n)) {
    return 0
  };

  return (n * (n + 1)) / 2;
}

// Recursive approach
// Time: O(n) — single pass from 1 to n
// Space: O(n) — constant extra memory
export function sumToNRecursion(n: number): number {
  if (n <= 0 || !Number.isFinite(n)) {
    return 0
  };
  
  return n + sumToNRecursion(n - 1);
}

console.log(sumToNIterative(10)); // 55
console.log(sumToNFormula(10)); // 55
console.log(sumToNRecursion(10)); // 55

console.log(sumToNIterative(5)); // 15
console.log(sumToNFormula(5)); // 15
console.log(sumToNRecursion(5)); // 15
