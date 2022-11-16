# Advanced formula environment, a Microsoft Garage project

Create and edit formulas using a powerful formula editor. With the advanced formula environment you can:
- View, format, and edit formulas defined in the grid with an advanced formula bar.
- Define and edit named functions, ranges, and formulas that can be synchronised with the Name Manager.
- Create collections of named functions called modules that are defined as code and stored as part of the Workbook.
- Quickly import LAMBDA modules directly from GitHub gists.

The advanced formula environment (AFE) works in Excel for Desktop, Web, and Mac, without installing any additional software. All you need to do to get started is get the add-in from the Office store: https://aka.ms/get-afe.

The Microsoft Garage is an outlet for experimental projects for you to try. Learn more at https://garage.microsoft.com.

#### Localisation

AFE has some support for localisation of formulas and no support for localisation of app text. Formulas in AFE must be edited using a comma argument separator, such as `=SUM(1,2,3)`, however AFE will interact with workbooks using other separators such as semi-colon (`;`). When reading or saving a formula, AFE will automatically translate between formats. Function names can be written using the workbook’s locale, but AFE provides a setting to force English function names.
AFE will eventually support full formula localisation, rather than requiring comma argument separators.

#### Content
This repository contains documentation and examples only.

## Features

### Grid view
![Grid](https://user-images.githubusercontent.com/4489219/202191716-125ac5d9-6fd5-4dd8-bc12-a01241586563.gif)

### Manager
![Manager](https://user-images.githubusercontent.com/4489219/202194080-0b0bbebb-add4-4187-86da-dd8ae486476b.gif)

### Named function editor
![NamedFunction](https://user-images.githubusercontent.com/4489219/202191733-5e126a7d-35b4-44dd-9e8f-f9199fcdd089.gif)

### Modules
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
