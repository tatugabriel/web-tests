const { By, until } = require('selenium-webdriver');
const assert = require('assert'); // Import the assert module
const browserManager = require('./browserManager');

// Define the URL as a variable
const url = 'https://practice.expandtesting.com/inputs';

(async function typeInInput() {
    try {
        const driver = await browserManager.startBrowser();

        // Navigate to the page using the URL variable
        await driver.get(url);
        console.log("Navigated to the input page.");

        // Wait for the input box to be visible and interactable
        const inputBox = await driver.wait(until.elementLocated(By.xpath('//input[@type="number"]')), 10000);
        await driver.wait(until.elementIsVisible(inputBox), 10000); // Wait for visibility
        await driver.wait(until.elementIsEnabled(inputBox), 10000); // Wait for it to be interactable

        // Type a string instead of a number into the input box (this should fail)
        const stringToType = 'not_a_number';
        await inputBox.sendKeys(stringToType);
        console.log(`Typed the string "${stringToType}" into the input box.`);

        // Verification step: Get the value of the input and compare it
        const inputValue = await inputBox.getAttribute('value');
        
        // Use assert to automatically fail the test if the values don't match
        assert.strictEqual(inputValue, stringToType, `Verification failed: Expected "${stringToType}", but got "${inputValue}"`);

        // If the test passes (which it shouldn't)
        console.log("Verification successful: The string was typed correctly (this should not happen).");

        // Optionally, stop the browser after the test
        // await browserManager.stopBrowser();
    } catch (err) {
        console.error('Error:', err);
        // If there is an error or assertion failure, the test will fail here
    }
})();
