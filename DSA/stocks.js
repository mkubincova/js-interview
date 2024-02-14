/***** BEST TIME TO BUY AND SELL STOCKS  *****/
// You are given an prices of prices, where prices[i] is the price of a given stock on i-th dat
// You want to maximize profit by choosing a single day to buy a stock,
// and different day in the future to sell it.
// Return the maximum profit, or 0

// [7,1,5,3,6,4]    -> 5
// [7,6,4,3,1]      -> 0

// Brute force:
console.time("brute");

const maxProfitBrute = (prices) => {
    let maxProfit = 0;
    for (let i = 0; i < prices.length; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            if (prices[j] - prices[i] > maxProfit) maxProfit = prices[j] - prices[i];
        }
    }
    return maxProfit;
};
console.log(maxProfitBrute([7, 1, 5, 3, 6, 4]));
console.log(maxProfitBrute([7, 6, 4, 3, 1]));

console.timeEnd("brute"); // brute: 12.228ms


// Greedy algorhitm:
console.time("greedy");

const maxProfitGreedy = (prices) => {
    let minStockValue = prices[0] || 0;
    let maxProfit = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < minStockValue) minStockValue = prices[i];
        maxProfit = Math.max(maxProfit, prices[i] - minStockValue);
    }
    return maxProfit;
};
console.log(maxProfitGreedy([7, 1, 5, 3, 6, 4]));
console.log(maxProfitGreedy([7, 6, 4, 3, 1]));

console.timeEnd("greedy"); // greedy: 0.150ms
