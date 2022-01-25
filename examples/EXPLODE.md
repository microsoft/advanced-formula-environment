### Description
Explodes a text into a single-row array of single character texts.


### Code
```
explode =
LAMBDA(text,
  IF(LEN(text)=0,
     #NULL!, // Excel does not support empty arrays so we return the #NULL! error
     MAKEARRAY(1,LEN(text),lambda(i,j, MID(text,j,1)))));

test1 = explode("foo");
test2 = explode("");
```
