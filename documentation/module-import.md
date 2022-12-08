# Module import
AFE allows the import of modules (files that contain named formulas) into a workbook. Currently, AFE only supports importing a module from a GitHub gist URL such as https://gist.github.com/jack-williams/75f6ea2e9745cc31f1733450977db86c.

# How to import
To import from AFE you need to use the following icon and provide the URL.
![image](https://user-images.githubusercontent.com/4489219/206422847-7ecaf1e3-5ccd-47a8-a1aa-f6fc39c7a2f9.png)

When importing from the Names tab, a name for the module that will contain the formulas must be provided. Formulas defined in a module will start with the module name when used from Excel. For example, when importing a module with the content:
```
formula_a = LAMBDA(x, x + 1);

formula_b = 10;
```
into a module named `Module`, you must write `Module.formula_a` to access the function from a cell.

When importing from the "Modules" tab the module name is optional. If the module name is omitted, the formulas will be appended to the currently open module.

# Creating gists
To create a gist that holds a module the github website must be used. We do not currently support creating gists from AFE. If you are signed into github you can visit https://gist.github.com/ to create a new gist. The name of the gist can be anything, AFE does not use this currently. AFE assumes that the gist contains a single file.
Gists can be public or secret. _Secret gists can be accessed by anyone that has the URL._ AFE works with both public and secret gists.
![image](https://user-images.githubusercontent.com/4489219/206424098-85cff490-963b-4beb-8f5f-e533f710a53b.png)


# Module files
Currently, AFE does not allow modules to contain tab `\t` or carriage return `\r` characters. For indenting and line breaks, spaces and newline `\n` must be used, respectively. 
