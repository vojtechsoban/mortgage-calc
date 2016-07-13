export default class Mortgage {
    
    constructor (principal, rate, payment) {
        this.principal = principal;
        this.rate = rate;
        this.payment = payment;
        this.installmentSum = 0;
        this.installmentCount = 0;
    }
}
