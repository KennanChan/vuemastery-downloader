const auth = async (page, email, password) => {
  await page.click('button[class="button inverted"]');
  await page.click('button[class="button link"]');

  await page.focus('input[data-test="inputEmail"]');
  await page.keyboard.type(email)
  await page.focus('input[data-test="inputPassword"]');
  await page.keyboard.type(password)

  await page.click('button[class="button primary -full"]')
  await page.click('button[class="button primary -full"]')
}

module.exports = auth;