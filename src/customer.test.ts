import { Customer } from "./customer";
import { Rental } from "./rental";
import { Movie } from "./movie";

describe("Customer", () => {
  it("should test a text statement", () => {
    const customer = new Customer("Bob");
    customer.addRental(new Rental(new Movie("Jaws", Movie.REGULAR), 2));
    customer.addRental(new Rental(new Movie("Golden Eye", Movie.REGULAR), 3));
    customer.addRental(
      new Rental(new Movie("Short New", Movie.NEW_RELEASE), 1)
    );
    customer.addRental(new Rental(new Movie("Long New", Movie.NEW_RELEASE), 2));
    customer.addRental(new Rental(new Movie("Bambi", Movie.CHILDRENS), 3));
    customer.addRental(new Rental(new Movie("Toy Story", Movie.CHILDRENS), 4));

    const expected =
      "" +
      "Rental Record for Bob\n" +
      "\tJaws\t2.0\n" +
      "\tGolden Eye\t3.5\n" +
      "\tShort New\t3.0\n" +
      "\tLong New\t6.0\n" +
      "\tBambi\t1.5\n" +
      "\tToy Story\t3.0\n" +
      "Amount owed is 19.0\n" +
      "You earned 7 frequent renter points";

    expect(customer.statement()).toBe(expected);
  });

  it("should test an html statement", () => {
    const customer = new Customer("martin");
    customer.addRental(new Rental(new Movie("Ran", Movie.REGULAR), 3));
    customer.addRental(
      new Rental(new Movie("Trois Couleurs: Bleu", Movie.REGULAR), 2)
    );

    const expected = `<h1>Rental Record for <em>martin</em></h1>
<table>
  <tr><td>Ran</td><td>3.5</td></tr>
  <tr><td>Trois Couleurs: Bleu</td><td>2</td></tr>
</table>
<p>Amount owed is <em>5.5</em></p>
<p>You earned <em>2</em> frequent renter points</p>`;

    expect(customer.htmlStatement()).toBe(expected);
  });
});
