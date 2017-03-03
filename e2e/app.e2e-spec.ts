import { ServersFilterPage } from './app.po';

describe('servers-filter App', () => {
  let page: ServersFilterPage;

  beforeEach(() => {
    page = new ServersFilterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
