import { Movie } from "./movie";
import { HtmlStatement, TextStatement } from "./statement";
import { StatementItem } from "./statement_item";
import { Rental } from "./rental";

export class Customer {
  private name: string;
  private rentals: Rental[] = [];

  public constructor(name: string) {
    this.name = name;
  }

  public addRental(arg: Rental) {
    this.rentals.push(arg);
  }

  public getName(): string {
    return this.name;
  }

  public statement(): string {
    return new TextStatement(this.getName(), this.rentals).build();
  }

  public htmlStatement(): string {
    return new HtmlStatement(this.getName(), this.rentals).build();
  }
}
