# Import from grid

The _import from grid_ action is a new **experimental** feature of AFE that allows formulas defined in the grid to be converted to named functions.

Define the calculation then select the region of cells to include in the funtion, the input cells, and the output cell. AFE will then convert this to a named function.

![ImportFromGrid](https://user-images.githubusercontent.com/4489219/202484379-bcfe32cd-e8e6-4165-b140-382c1ccec5a7.gif)

AFE tries to automatically detect input and output cells, as well as trying to infer parameter names.

### Limitations

This is an experimental fetaure with known limitations, including lack of support for dynamic arrays. All feedback is appreciated.
