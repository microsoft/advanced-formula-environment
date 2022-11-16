# CHANGELOG

## AFE 1.1 (November 2022)

### What's new
Grid tab. You can now view and edit the selected cell using the AFE editor.

Named function editor. Define and edit named functions using a new friendly interface.

Name descriptions are now synchronised with Excel’s name manager. When defining names within modules, leading doc comments of the form <code>{"/** */"}</code> will be saved to the name manager.

Initial support for locales with different argument separators. AFE still requires that formulas are written using comma (`,`), but now AFE will automatically convert between (`,`) and (`;`) when interacting with the workbook.

For locales with different function names, you can use Settings to choose between editing formulas in AFE using the same language as Excel, or English.

Extract formulas from the grid using the "Add function from grid" button. A calculation split into steps across several cells can be pulled out into a reusable `LAMBDA` function with parameters.

Support for table references, with autocomplete for table and column names.

Formula formatting (pretty printing) now works for all formulas and will preserve comments.

Enhanced syntax coloring

New keybindings for synchronising (Ctrl-S) and formatting formulas (Ctrl-Shift-F)

### What's changed
 Namespaces have changed to modules. A module is like a namespace, but now the code is managed exclusively by the code editor under the Modules tab. Modules are treated as additional files that travel with the workbook, and the names are synchronised one-way into the Name Manager by AFE.

The Manager tab has been changed to the Names tab. The Names tab displays the names defined in Excel's name manager, and are two-way synchronised. Names that were exported to the name manager by modules are not displayed.

The Editor tab has been changed to the Modules tab.

AFE no longer uses hidden sheets to store formulas. Module files are now stored directly within the workbook. Any existing hidden code sheets in your workbook (from AFE v1.0) are automatically converted to modules. AFE will not delete the hidden sheet automatically.

## AFE 1.0 (February 2022)

### First release of AFE
Drawing inspiration from popular code editors—including Visual Studio Code—the advanced formula environment add-in provides you with features such as intellisense, code folding, inline error detection, formatting, and namespaces.

Capabilities in the first release included:
- Enhanced formula editor allows you to add comments to your code, undo and redo your edits, define named formulas, and easily create multi-line formulas
- Share your work with others through GitHub Gists to reap the benefits of repositories and more easily migrate your logic between spreadsheets
- Filter and find your formulas with intelligent filter functionality to easily locate the formula you need
