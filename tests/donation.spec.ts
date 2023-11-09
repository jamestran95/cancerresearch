import {expect, test} from "@playwright/test"; 

test("User can make a donation", async ({page}) => {
  test.setTimeout(30_000);

  //Navigates to URL
  const url = "https://app.pws.int.cruk.org/support-us/your-donation";
  await page.goto(url, {waitUntil: "domcontentloaded"});

  //Cookie element
  const acceptCookieBtn = page.getByText("OK, continue to site");

  //The locators of the actionable elements on the first page
  const amountBtn = page.locator("#amount10");
  const donationType = page.getByText("I am donating my own money");
  const selectMotivation = page.getByTestId("selectMotivation");
  const destination = page.getByText(
    "Choose a cancer type or an area of research"
  );
  const selectCancer = page.getByTestId("restrictionSelect");
  const submitBtn = page.getByText("Continue", {exact: true});

  //Verification that the URL has the correct title
  await expect(page).toHaveTitle("Support us | Cancer Research UK");

  //Accepts cookie
  await acceptCookieBtn.click({timeout: 5000}).catch(() => {});
  
  //User selects to donate £10 and goes through the rest of the page
  await amountBtn.click();
  await donationType.click({force: true});
  await selectMotivation.selectOption("In memory of someone");
  await destination.click({force: true});
  await selectCancer.selectOption("Bowel cancer");

  // Move on to the next page:
  await submitBtn.click();
  await page.waitForLoadState("networkidle");  

  //Verification that the URL has the correct URL
  await expect(page).toHaveURL("https://app.pws.int.cruk.org/support-us/details");

  //The locators of the actionable elements on the form on the second page
  const selectTitle = page.getByTestId("title");
  const firstName = page.getByTestId("forename");
  const lastName = page.getByTestId("surname");
  const email = page.getByTestId("emailAddress");
  const phone = page.getByTestId("phoneNumber");
  const postcode = page.locator("#postalCode");
  const findAddress = page.getByText("Find address", {exact: true});
  const selectAddress = page.locator("#addressSelection");
  const submitBtn2 = page.getByText("Continue", {exact: true});


  // User enters their details
  await selectTitle.selectOption("Mr");
  await firstName.fill("Tester");
  await lastName.fill("O'Doh-erty");
  await email.fill("auto-pws@cancer.org.uk");
  await phone.fill("07999999999");
  await postcode.fill("GU22 7SS");
  await findAddress.click({force: true});
  await selectAddress.selectOption("37 The Rowans, Woking, GU22 7SS");
  page.waitForTimeout(10000)
  
  // Move on to the next page:
  await submitBtn2.click({force: true});

  //Verification that the URL has the correct URL and waits for the page to load
  await page.waitForURL('https://app.pws.int.cruk.org/support-us/payment', {waitUntil: "domcontentloaded"})

  //Actions taken on the elements on the payment page
  await page.locator('label').filter({ hasText: 'Credit / Debit card' }).click();
  await page.getByLabel('Cardholder name (required)').fill("Tester O'Doherty");
  await page.frameLocator('iframe[name="braintree-hosted-field-number"]').getByLabel('Credit Card Number').fill('4000000000001000');
  await page.frameLocator('iframe[name="braintree-hosted-field-expirationDate"]').getByLabel('expiration').fill('1225');
  await page.frameLocator('iframe[name="braintree-hosted-field-cvv"]').getByLabel('cvv').fill('123');
  await page.getByText('Yes I would like Cancer Research UK to claim Gift Aid on my donation').click();

  //Submitting payment
  await page.getByRole('button', { name: 'Complete my donation' }).click();

  //Verification that the URL has the correct URL and waits for the page to load
  await page.waitForURL('https://app.pws.int.cruk.org/support-us/thanks', {waitUntil: "domcontentloaded"})
  
  //Provides a screenshot as verification that the test has passed
  await page.screenshot({path: "verify.png", fullPage: true});
});

