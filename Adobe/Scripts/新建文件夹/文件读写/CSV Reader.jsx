{
    // https://aenhancers.com/viewtopic.php?f=3&t=3411
    // ------------------------------------------------------------------------
    // csvRead -
    //
    // Show file dialogue with header message,and then read the selected fileit into the array allText.
    function csvRead(message, allText) {
        const delimeter = ',';
        const quote = '"';

        var csvFile = File.openDialog(message);

        if (csvFile == null) {
            return false;
        } else {
            csvFile.open("r");

            while (!csvFile.eof) {
                var text = csvFile.readln();
                var rowText = [];

                var n1 = 0;
                while (n1 < text.length) {

                    if (text[n1] == quote) {
                        // quoted cell
                        var cellText = "";
                        var closingQuoteFound = false;
                        while (!closingQuoteFound) {
                            var n2 = text.substring(n1 + 1, text.length).indexOf(quote);
                            n2 = n2 < 0 ? text.length : n1 + n2 + 1; // n2 is now the zero-based index of the quote within the full string "text".
                            if (n2 < (text.length - 1)) {
                                // safe to check the character following the quote, to see if it is a double, or escaped quote.
                                if (text[n2 + 1] == quote) {
                                    // quote is escaped
                                    cellText += text.substring(n1 + 1, n2 + 1); // actual data is from after the opening quote, or last processed data, to before the quote escape
                                    n1 = n2 + 1; // n1 moved to the escape, the character before the continuation of the cell.
                                } else if (text[n2 + 1] == delimeter) {
                                    // closing quote found, as it is not escaped and succeeded by a delimeter
                                    closingQuoteFound = true;
                                    cellText += text.substring(n1 + 1, n2); // actual data is from after the opening quote, or last processed data, to before the ending quote
                                    rowText.push(cellText);
                                    n1 = n2 + 2; // n1 moved after the delimeter, the beginning of the next cell.
                                    if (n1 == text.length) {
                                        rowText.push("");
                                    }
                                } else {
                                    // the csv file is not well formed. It has a quoted cell that is not succeeded by a delimeter.
                                    alertWrapper("Quoted cell not followed by delimeter on line " + lineNo);
                                    csvFile.close();
                                    return;
                                }
                            } else {
                                // closing quote found at end of line, so it is not an escaped quote
                                closingQuoteFound = true;
                                cellText += text.substring(n1 + 1, n2);
                                rowText.push(cellText);
                                n1 = n2 + 1; // n1 moved to the end-of-line
                            }
                        }
                    } else {
                        // unquoted cell
                        var n2 = text.substring(n1, text.length).indexOf(delimeter);
                        n2 = n2 < 0 ? text.length : n1 + n2;
                        cellText = text.substring(n1, n2);
                        rowText.push(cellText);
                        n1 = n2 + 1; // n1 moved after delimeter, the beginning of the next cell.

                        if (n1 == text.length) {
                            rowText.push("");
                        }
                    }
                }

                allText.push(rowText);
            }
            csvFile.close();

            return true;
        }
    }

    // Simple test routine to repeatedly read a csv file and write out the data as a demonstration
    var allText = [];
    while (csvRead("Select test CSV file", allText)) {

        while (allText.length > 0) {
            for (rowText = allText.shift(); rowText.length > 0;) {
                $.write(rowText.shift() + ',');
            }
            $.writeln("");
        }
    }
}