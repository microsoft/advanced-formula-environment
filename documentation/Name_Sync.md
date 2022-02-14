# Overview
AFE operates in two possible modes when saving (or "syncing") names to the workbook.
Here, we describe the two modes, how to determine which mode is running, and how to change modes.

# Sync Modes
The two modes are:
  1. Sync with metadata hidden sheet.
  
     AFE will save defined names into the name manager, and also save the defined names into a hidden sheet.
     When opening AFE, the add-in will read and display only those names in the hidden sheet. 
     In this mode, AFE will not update with names that are changed directly from the name manager.
     If the hidden sheet does not exist, AFE will read the names from the name manager.
     
     You are in this mode when the save icon appears as:
     
     <img width="59" alt="image" src="https://user-images.githubusercontent.com/4489219/153855932-6ad9782c-09f6-4be6-9a36-82522a4a3e55.png">

  3. Sync with no hidden sheet.

     AFE will save defined names into the name manager. When opening AFE, the add-in will read all workbook names in the name manager, format them, and display them in the add-in.
     In this mode, AFE will update with names that are changed directly from the name manager, but you will need to reload AFE to see these changes.
     
     You are in this mode when the save icon appears as:
     
     <img width="61" alt="image" src="https://user-images.githubusercontent.com/4489219/153855821-009c050e-df12-4c67-a936-9be64aff318c.png">


The first time you sync names, AFE will present a dialogue asking you to allow hidden sheets to be used.
<img width="339" alt="image" src="https://user-images.githubusercontent.com/4489219/153856568-096f13f9-36e1-4115-b7a5-9ca52a39589b.png">


This choice can be changed at any time. See [Changing Modes](documentation.md/#changing-modes).

## Why have two modes?
AFE allows users to write comments within a formula, such as.
<img width="761" alt="image" src="https://user-images.githubusercontent.com/4489219/153853826-561f3822-60ac-4a7f-a06f-08e6865cee4e.png">

Excel does not natively support formula comments, therefore to be able to save comments between uses of the add-in, we must store the formulas verbatim in a hidden sheet.
Additionally, the hidden sheet also preserves the exact formatting and layout of the definitions. In some cases, a user may want their definitions to appear in a logic order
rather than alphabetical.

## Which mode to use?
If you share a workbook with others, or also use the name manager directly, we recommend using the mode that does not create a hidden sheet.
If you are writing a complex LAMBDA and would like to have comments within the LAMBDA, we suggest saving the LAMBDA as a github gist and importing that when required.

If you primarily are an independent author of workbooks, only use the name manager via AFE, and like to use comments, we suggest using the mode that saves with a hidden sheet.

# Changing Modes

The mode can be switched from the Settings page, accessed from the top right menu.
<img width="605" alt="image" src="https://user-images.githubusercontent.com/4489219/153855403-ddc9ac50-45bd-480c-8a62-28a79eb246dc.png">

When you disable hidden sheets, AFE will delete the hidden sheet (if it exists) on the next save. Switching between modes will not affect or corrupt the names in your name manager;
they will continue to calculate the same. Disabling hidden sheets will delete any comments you have written.

# Future directions

The hidden sheet sync mode primarily exists to allow formula comments to perist between uses of AFE.
In the future, we hope to support formula comments through an encoding mechanism that does not require a hidden sheet.
We do not consider our use of hidden sheets to be a long-term solution.
