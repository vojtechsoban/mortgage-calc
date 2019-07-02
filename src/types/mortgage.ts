export interface Mortgage {
    principal: number
    parameters: Array<MortgageParameters>
    extraPayments: Array<ExtraPayment>
    start: Date
}

export interface MortgageParameters {
    payments: number;
    rate: number;
    payment: number;
}

export interface InstallmentSum {
    installmentPart: number
    principalPart: number
}

export interface ExtraPayment {
    paymentIndex: number;
    amount: number;
    type: ExtraPaymentType;
    date: Date;
}

export enum ExtraPaymentType {
    constant_duration,
    constant_payment
}
