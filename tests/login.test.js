const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;

describe('Timesheet Management', function () {
  let driver;

  // Setup WebDriver before each test
  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();

    // Navigate to login page
    await driver.get('http://localhost:3000/login');

    // Wait for the login page to load
    await driver.wait(until.elementLocated(By.id('username')), 5000);
    await driver.wait(until.elementLocated(By.id('password')), 5000);
    await driver.wait(until.elementLocated(By.id('login-btn')), 5000);

    // Fill in login credentials and submit
    await driver.findElement(By.id('username')).sendKeys('l@gmail.com');
    await driver.findElement(By.id('password')).sendKeys('1234');
    await driver.findElement(By.id('login-btn')).click();

    // Wait for the dashboard or main page to load after login
    await driver.wait(until.urlContains('/m_timesheets'), 5000);
  });

  // Close WebDriver after each test
  afterEach(async function () {
    await driver.quit();
  });

  it('should display timesheet filters', async function () {
    // Wait for the filter links to appear before interacting with them
    const pendingLink = await driver.wait(until.elementLocated(By.linkText('Pending')), 5000);
    const approvedLink = await driver.wait(until.elementLocated(By.linkText('Approved')), 5000);
    const rejectedLink = await driver.wait(until.elementLocated(By.linkText('Rejected')), 5000);

    assert.isTrue(await pendingLink.isDisplayed(), 'Pending link should be visible');
    assert.isTrue(await approvedLink.isDisplayed(), 'Approved link should be visible');
    assert.isTrue(await rejectedLink.isDisplayed(), 'Rejected link should be visible');
  });

  it('should show a message if no timesheets are found for the selected filter', async function () {
    await driver.get('http://localhost:3000/m_timesheets?filter=pending');
    
    // Wait for the message to appear
    const message = await driver.wait(until.elementLocated(By.css('p')), 5000);
    const text = await message.getText();
    assert.equal(text, 'No timesheets found for the selected filter.');
  });

  it('should allow manager to approve or reject timesheet', async function () {
    await driver.get('http://localhost:3000/m_timesheets?filter=pending');

    // Wait for the buttons to be available
    const approveButton = await driver.wait(until.elementLocated(By.xpath("//button[@value='approved']")), 5000);
    const rejectButton = await driver.wait(until.elementLocated(By.xpath("//button[@value='rejected']")), 5000);

    assert.isTrue(await approveButton.isDisplayed(), 'Approve button should be visible');
    assert.isTrue(await rejectButton.isDisplayed(), 'Reject button should be visible');

    // Example of interacting with the form
    await approveButton.click();
    const status = await driver.wait(until.elementLocated(By.xpath("//td[text()='approved']")), 5000);
    assert.isTrue(await status.isDisplayed(), 'Status should be updated to approved');
  });

  it('should navigate to manager dashboard when "Back" is clicked', async function () {
    await driver.get('http://localhost:3000/m_timesheets');
    
    // Wait for the "Back" link to appear
    const backLink = await driver.wait(until.elementLocated(By.linkText('Back')), 5000);

    await backLink.click();
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, 'http://localhost:3000/manager-dashboard', 'It should navigate to the manager dashboard');
  });
});
