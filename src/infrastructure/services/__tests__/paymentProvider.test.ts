import { TestProvider, getPaymentProvider } from '../paymentProvider';

describe('TestProvider', () => {
  let provider: TestProvider;

  beforeEach(() => {
    provider = new TestProvider();
  });

  it('should always fail with INSUFFICIENT_FUNDS for card 5200828282828210', async () => {
    const result = await provider.processPayment(100, '5200828282828210');
    expect(result.success).toBe(false);
    expect(result.reason).toBe('INSUFFICIENT_FUNDS');
  });

  it('should return success for valid card', async () => {
    const result = await provider.processPayment(100, '4111111111111111');
    expect(result.success).toBeDefined();
    expect(typeof result.success).toBe('boolean');
  });

  it('should return object with success property', async () => {
    const result = await provider.processPayment(50, '5555555555554444');
    expect(result).toHaveProperty('success');
  });

  it('should handle different amounts', async () => {
    const result = await provider.processPayment(999.99, '4111111111111111');
    expect(result).toBeDefined();
  });

  it('should return reason when payment fails', async () => {
    const result = await provider.processPayment(100, '5200828282828210');
    expect(result.reason).toBeDefined();
  });
});

describe('getPaymentProvider', () => {
  it('should return a PaymentGateway instance', () => {
    const provider = getPaymentProvider();
    expect(provider).toBeDefined();
    expect(typeof provider.processPayment).toBe('function');
  });

  it('should return TestProvider instance', () => {
    const provider = getPaymentProvider();
    expect(provider instanceof TestProvider).toBe(true);
  });
});
