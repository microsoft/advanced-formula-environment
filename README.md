# Advanced formula environment, a Microsoft Garage project

Create and edit formulas using a powerful formula editor. With the advanced formula environment you can:
- View, format, and edit formulas defined in the grid with an advanced formula bar.
- Define and edit named functions, ranges, and formulas that can be synchronised with the Name Manager.
- Create collections of named functions called modules that are defined as code and stored as part of the Workbook.
- Quickly import LAMBDA modules directly from GitHub gists.

The advanced formula environment (AFE) works in Excel for Desktop, Web, and Mac, without installing any additional software. All you need to do to get started is get the add-in from the Office store: https://aka.ms/get-afe. Once installed, you can find AFE under the Formulas tab in Excel.

The Microsoft Garage is an outlet for experimental projects for you to try. Learn more at https://garage.microsoft.com.

#### Localisation
AFE supports formula localisation, including argument separators such as `,` and `;`, and function names. By default, all formulas, including those in modules, will be translated to the workbook's locale. AFE provides a setting to fix all formulas to English.

#### Content
This repository contains documentation and examples only.

## Features

### Grid view
The default page is the Grid page, which displays the currently selected cell. AFE will format the formula to fit within the window, and will convert the formula to a single line when commiting back to the workbook. AFE provides a setting to preserve the formula formatting from the cell.
<br></br>
![Grid](https://user-images.githubusercontent.com/4489219/202216103-d8cc0f11-1054-4ab1-81c5-c5e96f097ee8.gif)

### Name manager
The Names tab is a manager for the names defined in the workbook. AFE categorises names as functions, ranges, or formulas. The modules tab is used to track collections of named formulas defined using additional code files.
<br></br>
![Manager](https://user-images.githubusercontent.com/4489219/202194080-0b0bbebb-add4-4187-86da-dd8ae486476b.gif)

### Named function editor
Define named functions using a friendly editor. No need to write `LAMBDA`. Provide the arguments and the function definition to create a reusable formula.
<br></br>
![NamedFunction](https://user-images.githubusercontent.com/4489219/202191733-5e126a7d-35b4-44dd-9e8f-f9199fcdd089.gif)

### Modules
Organise collections of named formulas as modules. Modules are defined using files that are stored with the workbook and then loaded into the Name Manager by AFE. Quickly share and import modules from GitHub gists. (Note: modules were previously called namespaces. We changed the name because modules are now exclusively authored as code files and stored within the structure of the document.)
<br></br>
![Modules](https://user-images.githubusercontent.com/4489219/202191749-92071729-6cc7-4d8b-9f74-c1e023dc7468.gif)


## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
