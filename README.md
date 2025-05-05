# R1 Machine Price Calculator

This is a simple HTML application for calculating R1 machine component prices, supporting currency conversion between USD, AUD, and CNY.

## Features

- Add, delete, and modify component information
- Support for three currencies: US Dollar (USD), Australian Dollar (AUD), and Chinese Yuan (CNY)
- Automatic calculation of component prices and totals
- Adjustable exchange rates
- Responsive design for various devices
- Export data to CSV file
- Component categorization (CPU, GPU, Memory, etc.)

## How to Use

1. Open the `index.html` file in a browser to view the application
2. Pre-filled with common R1 machine components
3. Click the "Add Component" button to add a new component row
4. In each row, you can:
   - Enter component name (for newly added components)
   - Select a category (CPU, Memory, Storage, etc.)
   - Adjust quantity
   - Modify unit price
   - Select currency
   - View automatically calculated totals in different currencies
   - Add remarks for additional information
   - Use the delete button to remove unwanted components
5. Adjust exchange rates at the top of the page, all prices will update automatically
6. Click the "Export to CSV" button to download the current data as a CSV file

### Command Line Access

To open the calculator directly from the command line:

```
start chrome "file:///C:/Users/zdhpe/Desktop/r1machine_price/index.html"
```

#### Setting Up a Quick Launcher (Windows)

For easier access, create a batch file:

1. Create a new text file on your desktop or another convenient location
2. Add these lines to the file:
   ```
   @echo off
   start chrome "file:///C:/Users/zdhpe/Desktop/r1machine_price/index.html"
   ```
3. Save the file with a `.bat` extension, for example: `r1calc.bat`
4. Double-click this file whenever you want to open the calculator

#### Alternative Methods

You can also:
- Create a desktop shortcut to the HTML file
- Pin the calculator to your taskbar after opening it in Chrome
- Add the file to your browser bookmarks

## File Structure

- `index.html` - Main HTML file
- `styles.css` - Stylesheet
- `script.js` - JavaScript functionality
- `README.md` - This documentation file

## Task Status

### Completed Tasks
- Initial application setup
- Basic calculator functionality
- Multi-currency support
- Component addition and deletion
- Responsive design implementation
- Accessibility improvements
- Add "Export to CSV" button
- Add "Remarks" column after Total (CNY) for storing additional information
- Add Motherboard Supermicro MBD-H13DSH (SoC SP5 AMD EPYC 9004 Series, SATA, M.2, DDR5)
- Add Seasonic PRIME PX-1600 1600W Platinum ATX 3.0 Power Supply

### Pending Tasks

### To-Do Tasks
- Add "Category" column to display component types (CPU, Memory, GPU, PSU, Storage, etc.)
- Implement filtering and sorting by component category
- Add subtotals by component category


## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript 