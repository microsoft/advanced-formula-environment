### Description
IF variants for different types.


### Code
```
IFBLANK = LAMBDA(value, value_if_blank,
    IF(ISBLANK(value), value_if_blank, value)
);

IFNUMBER = LAMBDA(value, value_if_num,
    IF(ISNUMBER(value), value_if_num, value)
);

IFTEXT = LAMBDA(value, value_if_text,
    IF(ISTEXT(value), value_if_text, value)
);

IFLOGICAL = LAMBDA(value, value_if_logical,
    IF(ISLOGICAL(value), value_if_logical, value)
);
```

### Gist link
https://gist.github.com/jack-williams/5859d170fcb363dad1620c4d40770527
