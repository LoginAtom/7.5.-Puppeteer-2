const puppeteer = require("puppeteer")
const chai = require("chai")
const expect = chai.expect
const {
    Given,
    When,
    Then,
    Before,
    After,
    setDefaultTimeout,
} = require("cucumber")
const {
    putText,
    getText,
    clickElement
} = require("../../lib/commands.js")
setDefaultTimeout(70000)
Before(async function() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 300
    })
    const page = await browser.newPage()
    this.browser = browser
    this.page = page
})
After(async function() {
    if (this.browser) {
        await this.browser.close()
    }
})
Given("user is on {string} page", async function(string) {
    return await this.page.goto(`http://qamid.tmweb.ru/client/index.php`, {
        setTimeout: 80000,
    })
})
When("user click by button of date 1", async function() {
    return await clickElement(this.page, ".page-nav__day:nth-child(2)")
})
When("user click by button of movie session time 1", async function() {
    return await clickElement(this.page, "body main a.movie-seances__time[href='#'][data-seance-id='217']")
})
When("user click to choose of free seat 1", async function() {
    return await clickElement(this.page, "body main div[class='buying-scheme__wrapper'] div:nth-child(7) span:nth-child(4)")
})
When("user click by button to book a ticket", async function() {
    return await clickElement(this.page, "button.acceptin-button")
})
When("user click by button of date 2", async function() {
    return await clickElement(this.page, ".page-nav__day.page-nav__day_chosen")
})
When("user click by button of movie session time 2", async function() {
    return await clickElement(this.page, "body main a.movie-seances__time[href='#'][data-seance-id='223']")
})
When("user click to choose of free seat 2", async function() {
    return await clickElement(this.page, "body main div[class='buying-scheme__wrapper'] div:nth-child(5) span:nth-child(5)")
})
When('user click by button of date 3', async function() {
    return await clickElement(this.page, ".page-nav__day.page-nav__day_chosen")
})
When('user click by button of movie session time 3', async function() {
    return await clickElement(this.page, "body main a.movie-seances__time[href='#'][data-seance-id='223']")
})
When("user click to choose of free seat 3", async function() {
    return await clickElement(this.page, "body main div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(5)")
})
Then("user sees the title {string}", async function(string) {
    await this.page.waitForSelector("body main h2")
    const eexpected = "Вы выбрали билеты:"
    const actual = await getText(this.page, ".ticket__check-title")
    await expect(actual).contain(eexpected)
})
Then("Button for booking has property disabled: {string}", async function(string) {
    const disabledProperty = await this.page.$eval("button", (button) => {
        return button.disabled;
    });
    await expect(String(disabledProperty)).to.contain(string);
});