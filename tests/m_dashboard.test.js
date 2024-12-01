// npx mocha tests/m_dashboard.test.js
const { JSDOM } = require('jsdom');
const { expect } = require('chai');
const fs = require('fs');

// Load the HTML template into JSDOM for testing
const htmlContent = fs.readFileSync('views/dashboard.ejs', 'utf8');
const { window } = new JSDOM(htmlContent);
const { document } = window;

describe('Dashboard Page Tests', function () {

  it('should have the correct page title', function () {
    const title = document.querySelector('title').textContent;
    expect(title).to.equal('Employee Dashboard');
  });

  it('should have a header with the title WORKSPY', function () {
    const headerTitle = document.querySelector('.header-title').textContent;
    expect(headerTitle).to.equal('WORKSPY');
  });

  it('should have a slogan in the header', function () {
    const slogan = document.querySelector('.slogan').textContent;
    expect(slogan).to.equal('"Empowering Workforces, Simplifying Lives"');
  });

  it('should display the correct logout button', function () {
    const logoutButton = document.querySelector('.logout-btn');
    expect(logoutButton).to.not.be.null;
    expect(logoutButton.textContent).to.include('Logout');
  });



  it('should have at least 4 dashboard links', function () {
    const dashboardLinks = document.querySelectorAll('.dashboard-link');
    expect(dashboardLinks.length).to.equal(4);
  });

  it('should have a tasks section', function () {
    const tasksSection = document.querySelector('.tasks-section');
    expect(tasksSection).to.not.be.null;
  });

  it('should display "No tasks assigned yet." when no tasks are present', function () {
    // For this test, we simulate that there are no tasks
    const tasksSection = document.querySelector('.tasks-section');
    const taskMessage = tasksSection.querySelector('p');
    expect(taskMessage).to.not.be.null;
    expect(taskMessage.textContent).to.equal('No tasks assigned yet.');
  });

 

  it('should display the footer with copyright information', function () {
    const footer = document.querySelector('.footer').textContent;
    expect(footer).to.include('WorkSpy. All Rights Reserved to \'M-A-L\'.');
  });

});
