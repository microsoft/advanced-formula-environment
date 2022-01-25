### Description
Describes a dataset using summary statistics. When `features` is omitted then `DESCRIBE` uses every aggregation function.
- `array` an array to summarise by column.
- `[features]` a string or 1-D array (column or row major) of aggregation functions names 

### Code
```
DESCRIBE = LAMBDA(array, [features],
    LET(
        _sum, LAMBDA(x, SUM(x)),
        _mean, LAMBDA(x, AVERAGE(x)),
        _count, LAMBDA(x, COUNT(x)),
        _std, LAMBDA(x, STDEV(x)),
        _min, LAMBDA(x, MIN(x)),
        _25, LAMBDA(x, PERCENTILE.INC(x, 0.25)),
        _50, LAMBDA(x, PERCENTILE.INC(x, 0.5)),
        _75, LAMBDA(x, PERCENTILE.INC(x, 0.75)),
        _max, LAMBDA(x, MAX(x)),
        knownFunctions, {"SUM"; "MEAN"; "COUNT"; "STD"; "MIN"; "25%"; "50%"; "75%"; "MAX"},
        getAggregation, LAMBDA(id, array,
            CHOOSE(id, _sum, _mean, _count, _std, _min, _25, _50, _75, _max)(array)
        ),
        featureVector, IF(
            ISOMITTED(features),
            knownFunctions,
            IF(ROWS(features) = 1, TRANSPOSE(features), features)
        ),
        unknownFunctions, FILTER(featureVector, ISERROR(XMATCH(featureVector, knownFunctions, 0))),
        IF(
            TYPE(unknownFunctions) = 64,
            "Unknown functions " & ARRAYTOTEXT(unknownFunctions),
            MAKEARRAY(
                ROWS(featureVector),
                COLUMNS(array) + 1,
                LAMBDA(i, j,
                    LET(
                        functionName, INDEX(featureVector, i, 1),
                        functionId, XMATCH(functionName, knownFunctions, 0),
                        IF(j = 1, functionName, getAggregation(functionId, INDEX(array, 0, j - 1)))
                    )
                )
            )
        )
    )
);
```
