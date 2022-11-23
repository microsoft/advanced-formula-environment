# Frequently asked questions and problems

#### What is the very-hidden sheet used for?
AFE uses the sheet to detect certain formula locale properties that cannot be extracted from the Office JavaScript API. You can safely delete the sheet at anytime. AFE will recreate the sheet as required when opened. Previous versions of AFE used a hidden sheet to store formulas, this is now deprecated.

#### I see a "The argument is invalid or missing or has an incorrect format" error when trying to save.
This happens when AFE tries to save a formula with certain errors in, such as a missing bracket. To resolve this issue we first recommend the follow steps:
- Check that none of the formulas have errors (red underlines).
- If the formulas use structured references, check that they match the tables and table columns in the workbook.
- If the error persists, feel free to create an issue on the tracker with the formulas.
