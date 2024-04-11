// # Task
//
// Provide 3 unique implementations of the following function in TypeScript.
//
// - Comment on the complexity or efficiency of each function.
//
// **Input**: `n` - any integer
//
// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
//
// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
const sum_to_n = (n: number): number => {
    return n * (n + 1) / 2;
}

const sum_to_n2 = (n: number): number => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

const sum_to_n3 = (n: number): number => {
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n3(n - 1);
}


// Complexity of each function:
// sum_to_n: O(1)
// sum_to_n2: O(n)
// sum_to_n3: O(n)

// test cases
console.log(sum_to_n(5)); // 15
console.log(sum_to_n2(5)); // 15
console.log(sum_to_n3(5)); // 15
