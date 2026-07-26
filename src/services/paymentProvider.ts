export interface PaymentGateway {
  processPayment(amount: number, cardNumber: string): Promise<{ success: boolean; reason?: string }>;
}

export class WompiProvider implements PaymentGateway {
  async processPayment(
    amount: number,
    cardNumber: string
  ): Promise<{ success: boolean; reason?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Tarjeta que siempre falla por fondos insuficientes
        if (cardNumber === '5200828282828210') {
          resolve({ success: false, reason: 'INSUFFICIENT_FUNDS' });
          return;
        }

        // Simular diferentes escenarios para otras tarjetas
        const random = Math.random();

        // 70% éxito
        if (random < 0.7) {
          resolve({ success: true });
        }
        // 15% fondos insuficientes
        else if (random < 0.85) {
          resolve({ success: false, reason: 'INSUFFICIENT_FUNDS' });
        }
        // 10% tarjeta rechazada
        else if (random < 0.95) {
          resolve({ success: false, reason: 'CARD_DECLINED' });
        }
        // 5% error de red
        else {
          resolve({ success: false, reason: 'NETWORK_ERROR' });
        }
      }, 1500);
    });
  }
}

export function getPaymentProvider(): PaymentGateway {
  return new WompiProvider();
}
