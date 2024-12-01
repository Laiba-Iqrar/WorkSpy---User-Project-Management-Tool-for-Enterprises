// mocha tests/authController.test.js
const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const fs = require('fs');

describe('Login Page System Tests', function () {
  this.timeout(30000); // Increase timeout for Selenium operations
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  // Helper function to take a screenshot
  const takeScreenshot = async (filename) => {
    const image = await driver.takeScreenshot();
    fs.writeFileSync(filename, image, 'base64');
  };

  it('should display login page', async () => {
    await driver.get('http://localhost:3000/login');
    await takeScreenshot('screenshots/login-page.png'); // Take screenshot
    const pageTitle = await driver.getTitle();
    expect(pageTitle).to.equal('Login');
  });

  it('should display error for invalid credentials', async () => {
    await driver.get('http://localhost:3000/login');

    // Wait for email input field
    const emailInput = await driver.wait(until.elementLocated(By.id('email')), 10000);
    await emailInput.sendKeys('invalid@example.com');

    const passwordInput = await driver.wait(until.elementLocated(By.id('password')), 10000);
    await passwordInput.sendKeys('wrongpassword');

    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();

    // Take screenshot after entering invalid credentials
    await takeScreenshot('screenshots/invalid-credentials.png');

    // Wait for error message
    const errorMessage = await driver.wait(
      until.elementLocated(By.css('p')), // Ensure this selector matches the error element
      10000
    );
    const text = await errorMessage.getText();
    expect(text).to.equal('Invalid email or password');
  });

  it('should login successfully with valid credentials', async () => {
    await driver.get('http://localhost:3000/login');

    // Wait for email input field
    const emailInput = await driver.wait(until.elementLocated(By.id('email')), 10000);
    await emailInput.sendKeys('l@gmail.com');

    const passwordInput = await driver.wait(until.elementLocated(By.id('password')), 10000);
    await passwordInput.sendKeys('1234');

    // Take screenshot after entering valid credentials
    await takeScreenshot('screenshots/valid-credentials.png');

    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();

    // Wait for redirection
    await driver.wait(until.urlContains('/manager-dashboard'), 10000);

    // Take screenshot of the dashboard after successful login
    await takeScreenshot('screenshots/dashboard.png');

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/manager-dashboard');
  });
});
