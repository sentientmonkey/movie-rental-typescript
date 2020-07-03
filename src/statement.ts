import { StatementItem } from "./statement_item";
import { Rental } from "./rental";

export abstract class Statement {
  protected name: string;
  protected statementItems: StatementItem[];
  protected totalAmount: number;
  protected frequentRenterPoints: number;

  constructor(name: string, rentals: Rental[]) {
    this.name = name;
    this.statementItems = rentals.map(rental =>
      StatementItem.fromRental(rental)
    );
    this.totalAmount = this.statementItems.reduce(
      (sum, item) => sum + item.getPrice(),
      0
    );
    this.frequentRenterPoints = this.statementItems.reduce(
      (sum, item) => sum + item.getFrequentRenterPoints(),
      0
    );
  }

  public build(): string {
    let result = this.getHeader();
    result = this.getHeader();
    result += this.statementItems.map(item => this.getLineItem(item)).join("");
    result += this.getFooter();
    return result;
  }

  public abstract getHeader(): string;
  public abstract getFooter(): string;
  public abstract getLineItem(item: StatementItem): string;
}

export class TextStatement extends Statement {
  public getHeader(): string {
    return "Rental Record for " + this.name + "\n";
  }

  public getFooter(): string {
    return `Amount owed is ${this.totalAmount.toFixed(1)}
You earned ${this.frequentRenterPoints} frequent renter points`;
  }

  public getLineItem(item: StatementItem): string {
    return `\t${item.getMovieTitle()}\t${item.getPrice().toFixed(1)}\n`;
  }
}

export class HtmlStatement extends Statement {
  public getHeader(): string {
    return `<h1>Rental Record for <em>${this.name}</em></h1>
<table>
`;
  }

  public getFooter(): string {
    return `</table>
<p>Amount owed is <em>${this.totalAmount}</em></p>
<p>You earned <em>${this.frequentRenterPoints}</em> frequent renter points</p>`;
  }

  public getLineItem(item: StatementItem): string {
    return `  <tr><td>${item.getMovieTitle()}</td><td>${item.getPrice()}</td></tr>
`;
  }
}
