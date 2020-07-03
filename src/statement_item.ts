import { Movie } from "./movie";
import { Rental } from "./rental";

export abstract class StatementItem {
  private daysRented: number;
  private movieTitle: string;

  public getDaysRented(): number {
    return this.daysRented;
  }

  public getMovieTitle(): string {
    return this.movieTitle;
  }

  constructor(daysRented: number, movieTitle: string) {
    this.daysRented = daysRented;
    this.movieTitle = movieTitle;
  }

  abstract getPrice(): number;

  public getFrequentRenterPoints(): number {
    return 1;
  }

  public static fromRental(rental: Rental): StatementItem {
    const daysRented = rental.getDaysRented();
    const movieTitle = rental.getMovie().getTitle();

    switch (rental.getMovie().getPriceCode()) {
      case Movie.REGULAR:
        return new RegularStatementItem(daysRented, movieTitle);
      case Movie.NEW_RELEASE:
        return new NewReleaseStatementItem(daysRented, movieTitle);
      case Movie.CHILDRENS:
        return new ChildrensStatementItem(daysRented, movieTitle);
    }
  }
}

class RegularStatementItem extends StatementItem {
  public getPrice(): number {
    let price = 2;
    if (this.getDaysRented() > 2) {
      price += (this.getDaysRented() - 2) * 1.5;
    }

    return price;
  }
}

class NewReleaseStatementItem extends StatementItem {
  public getPrice(): number {
    return this.getDaysRented() * 3;
  }

  public getFrequentRenterPoints(): number {
    if (this.getDaysRented() > 1) {
      return 2;
    }

    return 1;
  }
}

class ChildrensStatementItem extends StatementItem {
  public getPrice(): number {
    let price = 1.5;
    if (this.getDaysRented() > 3) {
      price += (this.getDaysRented() - 3) * 1.5;
    }
    return price;
  }
}
