import { SubscribedModule } from './subscribed.module';

describe('SubscribedModule', () => {
  let subscribedModule: SubscribedModule;

  beforeEach(() => {
    subscribedModule = new SubscribedModule();
  });

  it('should create an instance', () => {
    expect(subscribedModule).toBeTruthy();
  });
});
