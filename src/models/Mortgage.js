export class Mortgage {
    
    constructor (principal, rate, payment) {
        this.principal = principal;
        this.rate = rate;
        this.payment = payment;
        this.installmentSum = 0;
        this.installmentCount = 0;
    }
}

export class InstallmentSum {

    constructor() {
        this.reset();
    }

    reset() {
        this.principalPart = 0;
        this.installmentPart = 0;
    }

    add(principalPart, installmentPart) {
        this.installmentPart += installmentPart;
        this.principalPart += principalPart;
    }
}
