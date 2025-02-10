const { Builder } = require('selenium-webdriver');
require('selenium-webdriver/edge');

let driver = null;

async function startBrowser() {
    if (!driver) {
        // Open a new browser if it's not already opened
        driver = await new Builder().forBrowser('MicrosoftEdge').build();
        console.log("Browser started.");
    } else {
        console.log("Reusing existing browser session.");
    }

    return driver;
}

async function stopBrowser() {
    if (driver) {
        await driver.quit();
        driver = null;
        console.log("Browser closed.");
    }
}

async function getDriver() {
    return driver;
}

module.exports = { startBrowser, stopBrowser, getDriver };
