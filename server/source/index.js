const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// All currencies
app.get("/getAllCurrencies", async (req, res) => {
    const nameURL = 'https://openexchangerates.org/api/currencies.json?app_id=55d7474216a54e6db0787c1aca2651be';
    try { 
        const namesResponse = await axios.get(nameURL);
        const nameData = namesResponse.data;
        return res.json(nameData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred fetching currencies" });
    }
});

// Get the target amount
app.get("/convert", async (req, res) => {
    const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;
    const amount = parseFloat(amountInSourceCurrency);

    if (isNaN(amount)) {
        return res.status(400).json({ error: "Invalid amount IN source currency" });
    }

    try {
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=55d7474216a54e6db0787c1aca2651be`;
        const dataResponse = await axios.get(dataURL);
        const rates = dataResponse.data.rates;

        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        if (!sourceRate || !targetRate) {
            return res.status(400).json({ error: "Invalid source or target currency" });
        }

        const targetAmount = (targetRate / sourceRate) * amount;
        return res.json({ targetAmount: targetAmount.toFixed(2) });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred during conversion" });
    }
});

// Listen to a port
app.listen(5000, () => {
    console.log("server started");
});
