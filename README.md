# Advanced formula environment, a Microsoft Garage project

Create and edit named formulas using a powerful formula editor. With the advanced formula environment you can:
- Write named formulas using an editor that supports inline errors, intellisense, comments, and more.
- Indent formulas, making them easier to read.
- Edit all named formulas using a single code editor.
- Quickly reuse LAMBDA formulas by importing them from GitHub gists, or by copying them for other workbooks.

The advanced formula environment works in Excel for Desktop, Web, and Mac, without installing any additional software. All you need to do to get started is get the add-in from the Office store: https://aka.ms/get-afe.

The Microsoft Garage is an outlet for experimental projects for you to try. Learn more at https://garage.microsoft.com. 

This repository contains documentation and examples only.

## Features

### Manager View
The default view is Manager view, which lists named formulas in the workbook. Sheet-scoped names are not displayed. Names can be created and edited inline, or by using a full screen editor.

Manager view also supports filtering names by queries such as names using a specific name, names used by a specific name, or the type of name.

![Manager](https://user-images.githubusercontent.com/4489219/151072204-9cb5228f-988d-4335-bdb7-761471114f63.gif)

### Formula Editing
The formula editor includes intellisense, inline errors, semantic renaming, and more.

![Editing](https://user-images.githubusercontent.com/4489219/151023910-384da066-693f-4ef9-b249-540320fde6e3.gif)

### Formula Formatting
The advanced formula environment will automatically layout formulas listed in Manager view to fit the screen, but this only changes the view and does not modify the stored formula.
The formula text can be formatted using the full screen formula editor. The add-in will indent the formula to fit within the available screen width.

![Formatting](https://user-images.githubusercontent.com/4489219/151000609-fb7374cd-8d65-4e02-9608-87ec2a9195cc.gif)

### Import
Existing definitions can be imported into a working using two methods: using GitHub gist URL, or pasting a text snippet.

#### Import from gist
Import via a gist, such as [this](https://gist.github.com/jack-williams/5859d170fcb363dad1620c4d40770527). All the names in the gist will be added to the workbook. If you choose to import into a new namespace, each imported name will be prefixed by the namespace. This can be a good way to import names without worrying about conflicts with existing names. We assume each gist contains a single text file.

#### Import from text
Import from text allows you to paste a series of name definitions into a text field and add them to the workbook. This feature is designed to be used with snippets created by the share button in the add-in. When you share a name from the add-in, we will include any names that the shared name references, ensuring that it works in any workbook.

### Editor View
An alternate representation of the name manager is Editor view. In Editor view, names are listed as assignments within a single code editor, making it easier to freely edit multiple names simultaneously.
Names are defined using the syntax `name = formula;`, for example:
```
addOne = LAMBDA(x, x + 1);
test = addOne(10) = 11;
```
The default code editor tab is called `Workbook`. Additional _namespaces_ can be created to make it easier to add names without duplication.
Within namespace `math`, the name `plus` can be defined and referenced directly. When `plus` is saved to the Name Manager, all references to the name are qualified by the namespace. 

![Editor](https://user-images.githubusercontent.com/4489219/151191434-8c624524-baab-42b4-8b58-fc50721bf71f.gif)

Namespaces make it possible to quickly copy existing definitions into your workbook without conflict. `Workbook` is unique in that names defined within are saved in their unqualified form.

Namespaces are an experimental feature aimed to make the process of reusing names easier. Namespaces are not (yet) designed to be a robust mechanism for formula reuse and modularity. We are interested to hear your feedback about sharing formulas. 


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
