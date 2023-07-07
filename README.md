# Jerry's Quick Mart Challenge - Solution

This is my solution to the Jerry's Quick Mart Challenge. The solution is implemented in JavaScript as a single-page application without using any external libraries or frameworks, and designed using HTML as well as CSS3.

## Features

- Select whether the customer is a Rewards Member or Regular customer.
- Add items to the cart.
- Remove individual items from the cart.
- View the cart, including item quantities, prices, and totals.
- Checkout and print a receipt.
- Cancel the transaction.

## Assumptions

- The inventory is passed into the application in a text file, with each item's information on a separate line.
- The receipt is printed as a text file with the transaction number and date included in the file name, which is downloaded at checkout time.
- The inventory is updated localy after checkout to avoid customers buying items that are out of stock.
- The tax status of items is either "Tax-Exempt" or "Taxable".
- Users can't add more items than what is only available.

## How to Run the Application

1. Clone the repository.
2. Open the `index.html` file in a web browser.
3. The application will be loaded, and you can interact with it using the provided user interface.

## File Structure

```
├── index.html # HTML file with the application layout
├── styles
│ └── index.css # CSS file for styling the application
├── scripts
│ └── main.js # The main JavaScript file with the application logic
├── assets
│ ├── images # Folder containing images used in the application
│ └── data
│   └── inventory.txt # Text file containing the inventory data
```

## License

This solution is licensed under the [MIT License](LICENSE).

Feel free to reach out if you have any questions or need further assistance.

Happy coding!