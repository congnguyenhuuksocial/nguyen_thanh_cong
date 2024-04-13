/**
 * Problem: Write a function that takes a number n and returns the sum of all numbers from 1 to n.
 * Formula solution using arithmetic progression formula
 * @param n number number to sum up to
 * @returns number sum of all numbers from 1 to n
 */
const sum_to_n = (n: number): number => {
    return n * (n + 1) / 2;
}

/**
 * Problem: Write a function that takes a number n and returns the sum of all numbers from 1 to n.
 * Iterative solution using for loop
 * @param n number number to sum up to
 * @returns number sum of all numbers from 1 to n
 */
const sum_to_n2 = (n: number): number => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Problem: Write a function that takes a number n and returns the sum of all numbers from 1 to n.
 * Recursive solution using recursion function
 * @param n number number to sum up to
 * @returns number sum of all numbers from 1 to n
 */
const sum_to_n3 = (n: number): number => {
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n3(n - 1);
}


const benchmark = (fn: (n: number) => number, n: number): void => {
    const start = process.hrtime();
    const result = fn(n);
    const end = process.hrtime(start);
    console.log(`Result: ${result}, Time: ${end[0]}s ${end[1] / 1e6}ms`);
}

const largeN = 10000

console.log("Testing Formula Approach");
benchmark(sum_to_n, largeN);

console.log("Testing Iterative Approach");
benchmark(sum_to_n2, largeN);

console.log("Testing Recursive Approach");
benchmark(sum_to_n3, largeN);
