document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const componentsTable = document.getElementById('components-table');
    const tbody = componentsTable.querySelector('tbody');
    const addRowButton = document.getElementById('add-row');
    const exportCsvButton = document.getElementById('export-csv');
    
    // Get exchange rate inputs
    const usdToCnyInput = document.getElementById('usd-cny');
    const audToCnyInput = document.getElementById('aud-cny');
    const audToUsdInput = document.getElementById('aud-usd');
    
    // Add event listeners to buttons
    addRowButton.addEventListener('click', addNewRow);
    exportCsvButton.addEventListener('click', exportTableToCSV);
    
    // Initialize table
    initializeTable();
    
    // Function to initialize the table
    function initializeTable() {
        // Add event listeners to all input fields and selects
        updateAllEventListeners();
        // Calculate initial totals
        calculateAllRows();
    }
    
    // Function to update all event listeners
    function updateAllEventListeners() {
        // Exchange rate change events
        usdToCnyInput.addEventListener('input', calculateAllRows);
        audToCnyInput.addEventListener('input', calculateAllRows);
        audToUsdInput.addEventListener('input', calculateAllRows);
        
        // Get all rows except the last row (subtotal)
        const rows = Array.from(tbody.querySelectorAll('tr')).slice(0, -1);
        
        rows.forEach(row => {
            // Price input events
            const priceInput = row.querySelector('.price');
            if (priceInput) {
                priceInput.addEventListener('input', () => calculateRow(row));
            }
            
            // Quantity input events
            const quantityInput = row.querySelector('.quantity');
            if (quantityInput) {
                quantityInput.addEventListener('input', () => calculateRow(row));
            }
            
            // Currency select events
            const currencySelect = row.querySelector('.currency');
            if (currencySelect) {
                currencySelect.addEventListener('change', () => calculateRow(row));
            }
            
            // Delete button events
            const deleteButton = row.querySelector('.delete-btn');
            if (deleteButton) {
                deleteButton.addEventListener('click', () => {
                    row.remove();
                    calculateSubtotal();
                });
            }
        });
    }
    
    // Function to add a new row
    function addNewRow() {
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td><input type="text" class="component-name" placeholder="Enter component name"></td>
            <td><input type="number" class="quantity" value="1" min="1" title="Quantity" aria-label="Quantity"></td>
            <td><input type="number" class="price" value="0.00" step="0.01" title="Unit Price" aria-label="Unit Price"></td>
            <td>
                <select class="currency" title="Currency" aria-label="Currency">
                    <option value="USD" selected>USD</option>
                    <option value="AUD">AUD</option>
                    <option value="CNY">CNY</option>
                </select>
            </td>
            <td class="total-usd">0.00</td>
            <td class="total-aud">0.00</td>
            <td class="total-cny">0.00</td>
            <td><input type="text" class="remarks" placeholder="Add notes here" title="Remarks" aria-label="Remarks"></td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        
        // Insert before the last row (subtotal)
        const lastRow = tbody.querySelector('tr:last-child');
        tbody.insertBefore(newRow, lastRow);
        
        // Add event listeners to new row
        const priceInput = newRow.querySelector('.price');
        priceInput.addEventListener('input', () => calculateRow(newRow));
        
        const quantityInput = newRow.querySelector('.quantity');
        quantityInput.addEventListener('input', () => calculateRow(newRow));
        
        const currencySelect = newRow.querySelector('.currency');
        currencySelect.addEventListener('change', () => calculateRow(newRow));
        
        const deleteButton = newRow.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            newRow.remove();
            calculateSubtotal();
        });
        
        // Calculate row totals
        calculateRow(newRow);
    }
    
    // Function to calculate a single row
    function calculateRow(row) {
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        const currency = row.querySelector('.currency').value;
        
        const usdToCny = parseFloat(usdToCnyInput.value) || 7.2950;
        const audToCny = parseFloat(audToCnyInput.value) || 5.5513;
        const audToUsd = parseFloat(audToUsdInput.value) || 0.7604;
        
        let totalUsd, totalAud, totalCny;
        
        switch(currency) {
            case 'USD':
                totalUsd = quantity * price;
                totalAud = totalUsd / audToUsd;
                totalCny = totalUsd * usdToCny;
                break;
            case 'AUD':
                totalAud = quantity * price;
                totalUsd = totalAud * audToUsd;
                totalCny = totalAud * audToCny;
                break;
            case 'CNY':
                totalCny = quantity * price;
                totalUsd = totalCny / usdToCny;
                totalAud = totalCny / audToCny;
                break;
        }
        
        // Update row totals
        row.querySelector('.total-usd').textContent = totalUsd.toFixed(2);
        row.querySelector('.total-aud').textContent = totalAud.toFixed(2);
        row.querySelector('.total-cny').textContent = totalCny.toFixed(2);
        
        // Recalculate subtotal
        calculateSubtotal();
    }
    
    // Function to calculate all rows
    function calculateAllRows() {
        // Get all rows except the last row (subtotal)
        const rows = Array.from(tbody.querySelectorAll('tr')).slice(0, -1);
        
        rows.forEach(row => {
            calculateRow(row);
        });
    }
    
    // Function to calculate subtotal
    function calculateSubtotal() {
        // Get all rows except the last row (subtotal)
        const rows = Array.from(tbody.querySelectorAll('tr')).slice(0, -1);
        
        let subtotalUsd = 0;
        let subtotalAud = 0;
        let subtotalCny = 0;
        
        rows.forEach(row => {
            subtotalUsd += parseFloat(row.querySelector('.total-usd').textContent) || 0;
            subtotalAud += parseFloat(row.querySelector('.total-aud').textContent) || 0;
            subtotalCny += parseFloat(row.querySelector('.total-cny').textContent) || 0;
        });
        
        // Update subtotal row
        document.getElementById('subtotal-usd').textContent = subtotalUsd.toFixed(2);
        document.getElementById('subtotal-aud').textContent = subtotalAud.toFixed(2);
        document.getElementById('subtotal-cny').textContent = subtotalCny.toFixed(2);
    }
    
    // Function to export table data to CSV
    function exportTableToCSV() {
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const csvContent = [];
        
        // Add header row
        const headers = [
            "Component", 
            "Quantity", 
            "Unit Price", 
            "Currency", 
            "Total (USD)", 
            "Total (AUD)", 
            "Total (CNY)",
            "Remarks"
        ];
        csvContent.push(headers.join(','));
        
        // Add data rows (excluding last row which is subtotal)
        rows.slice(0, -1).forEach(row => {
            const componentName = row.cells[0].textContent || row.querySelector('.component-name').value || '';
            const quantity = row.querySelector('.quantity').value || '';
            const unitPrice = row.querySelector('.price').value || '';
            const currency = row.querySelector('.currency').value || '';
            const totalUsd = row.querySelector('.total-usd').textContent || '';
            const totalAud = row.querySelector('.total-aud').textContent || '';
            const totalCny = row.querySelector('.total-cny').textContent || '';
            const remarks = row.querySelector('.remarks').value || '';
            
            // Escape any commas in text fields
            const escapedData = [
                escapeCsvField(componentName),
                quantity,
                unitPrice,
                currency,
                totalUsd,
                totalAud,
                totalCny,
                escapeCsvField(remarks)
            ];
            
            csvContent.push(escapedData.join(','));
        });
        
        // Add subtotal row
        const subtotalRow = [
            "Subtotal",
            "", 
            "", 
            "", 
            document.getElementById('subtotal-usd').textContent,
            document.getElementById('subtotal-aud').textContent,
            document.getElementById('subtotal-cny').textContent,
            ""
        ];
        csvContent.push(subtotalRow.join(','));
        
        // Create and download the CSV file
        const csvString = csvContent.join('\n');
        const csvData = new Blob([csvString], { type: 'text/csv' });
        const csvUrl = URL.createObjectURL(csvData);
        const downloadLink = document.createElement('a');
        
        downloadLink.href = csvUrl;
        downloadLink.download = 'r1_machine_price_calculator.csv';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    
    // Helper function to escape CSV fields
    function escapeCsvField(field) {
        if (field.includes(',') || field.includes('"') || field.includes('\n')) {
            return '"' + field.replace(/"/g, '""') + '"';
        }
        return field;
    }
}); 