describe('base test', () => {
  beforeAll(async () => {
    const element = await driver.$('~App');
    await element.click();
    await $('~Search').click();
    await $('~Invoke Search').click();
  });

  it('go to search invoke search', async () => {
    expect(
      await (
        await $('//android.widget.TextView[@text="App/Search/Invoke Search"]')
      ).isDisplayed()
    ).toBeTrue();
  });
});
