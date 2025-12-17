var maximumProfit = function (prices, k) {
    const n = prices.length;
    if (n === 0 || k === 0) return 0;

    const free = Array(k + 1).fill(0);
    const holdBuy = Array(k).fill(-Infinity);
    const holdShort = Array(k).fill(-Infinity);

    for (let price of prices) {
        // iterate transactions backwards to avoid same-day reuse
        for (let t = k - 1; t >= 0; t--) {
            // close transactions
            free[t + 1] = Math.max(
                free[t + 1],
                holdBuy[t] + price,
                holdShort[t] - price
            );

            // open transactions
            holdBuy[t] = Math.max(holdBuy[t], free[t] - price);
            holdShort[t] = Math.max(holdShort[t], free[t] + price);
        }
    }

    return Math.max(...free);
};
