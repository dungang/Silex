var assert = require('assert')
, silexServer = require('../../server/api-server.js')
, expect = require('chai').expect
, helper = require('../helper.js');

silexServer.setDebugMode(true);
/* *
//////////////////////////////////////////
// ChromeDriver
var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();
/* *
// Stand-alone Selenium Server
var webdriver = require('selenium-webdriver'),
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;

var server = new SeleniumServer('selenium-server-standalone-2.37.0.jar', {
  port: 4444
});

server.start();

var driver = new webdriver.Builder().
    usingServer(server.address()).
    withCapabilities(webdriver.Capabilities.firefox()).
    build();
/* */

//////////////////////////////////////////
// the tests

describe('Silex', function() {

before(function(done) {
    this.timeout(30000);
    helper.startSelenium(function (_) {
        // open silex
        helper.driver.get('http://localhost:6805/silex/debug.html').then(function () {
            done();
        });
    });
});
it('should be able to load', function(done) {

    this.timeout(3000);
    // wait for silex to be loaded
    setTimeout(function () {
        done();
    }, 2000)
});
it('should be able to open the file menu', function(done) {
    // click
    helper.driver.findElement(helper.webdriver.By.className('menu-item-file')).then(function (element) {
        element.click().then(function () {
            done();
        })
        return true;
    });
});
it('should be able to open the file explorer dialog', function(done) {
    // click 
    helper.driver.findElement(helper.webdriver.By.className('menu-item-file-open')).click();
    // check visibility
    helper.driver.findElement(helper.webdriver.By.className('silex-fileexplorer')).isDisplayed().then(function (isDisplayed) {
        console.log("dialog visibility", isDisplayed);
        if (isDisplayed) done();
        else done('dialog is not visible');
        return isDisplayed;
    });
});
it('should be able to close the file explorer dialog', function(done) {
    // click on close
    helper.driver.findElement(helper.webdriver.By.className('silex-fileexplorer'))
    .findElement(helper.webdriver.By.className('close-btn'))
    .click();
    // check visibility
    helper.driver.findElement(helper.webdriver.By.className('silex-fileexplorer'))
    .isDisplayed()
    .then(function (isDisplayed) {
        console.log("dialog visibility", isDisplayed);
        if (!isDisplayed) done();
        else done('dialog is still visible');
        return !isDisplayed;
    });
});
after(function(done) {
   this.timeout(30000);
    // shut down selenium
    helper.stopSelenium(function () {
        done();
    });
});
});
