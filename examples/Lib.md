### Description
A collection of basic functions on arrays and texts.

### Code
```
// Lib - a library of basic operations on Excel types

// ======================================================================================================
// Function to split a text into words separated by the delimiter symbol

textsplit = lambda(arg,delimiter,
  let( step_1, explode(delimiter & arg & delimiter)
     , step_2, makearray(1,columns(step_1),lambda(i,j,
                 IF(INDEX(step_1,1,j)=delimiter,j,0)    ))
     , starts, filter(step_2, step_2>0)
     , step_4, makearray(1,columns(starts)-1,lambda(i,j,
                let( start, index(starts,1,j)
                   , count, index(starts,1,j+1)-start-1
                   , MID(arg,start,count)
                )))
     , step_4
     )
);
explode = LAMBDA(string, makearray(1,LEN(string),lambda(i,j, MID(string,j,1))));

// ======================================================================================================
// Vectors: functions to make row and column vectors

row_vector =
lambda([x_1],[x_2],[x_3],[x_4],[x_5],[x_6],[x_7],[x_8],[x_9],[x_10],
let(w, ifs(isomitted(x_1),0,
           isomitted(x_2),1,
           isomitted(x_3),2,
           isomitted(x_4),3,
           isomitted(x_5),4,
           isomitted(x_6),5,
           isomitted(x_7),6,
           isomitted(x_8),7,
           isomitted(x_9),8,
           isomitted(x_10),9,
           true,10),
    array,makearray(1,w,lambda(i,j,switch(j,1,x_1,2,x_2,3,x_3,4,x_4,5,x_5,6,x_6,7,x_7,8,x_8,9,x_9,10,x_10))),       
    if(w=0,#null!,array)
));

column_vector =
lambda([x_1],[x_2],[x_3],[x_4],[x_5],[x_6],[x_7],[x_8],[x_9],[x_10],
let(row, row_vector(x_1,x_2,x_3,x_4,x_5,x_6,x_7,x_8,x_9,x_10),
    col, if(type(row)=64,transpose(row),row),
    col
));

// ======================================================================================================
// zip two column vectors of same height into a two-column table

c_zip = lambda(c_1,c_2, makearray(rows(c_1), 2, lambda(i,j,index(if(j=1,c_1,c_2),i,1))));

// ======================================================================================================
// vstack(array_1,array_2) returns the array obtained by stacking array_1 and array_2 vertically.

vstack =
  LAMBDA(array_1,array_2,
    LET(rows_1, ROWS(array_1),
        rows_2, ROWS(array_2),
        cols_1, COLUMNS(array_1),
        cols_2, COLUMNS(array_2),
        blank, " ",
        makearray(rows_1+rows_2, MAX(cols_1,cols_2), lambda(i,j,
          IF(i<=rows_1,
             IF(j<=cols_1,INDEX(array_1,i,j),blank),
             IF(j<=cols_2,INDEX(array_2,i-rows_1,j),blank)) ))
    ));

// ======================================================================================================
// Array concatenation: functions to make row and column vectors

sample_input = column_vector(lambda({1;2;3}), lambda({"four";5}), lambda({6}));
test_v_concat = v_concat(sample_input);

seq_or = lambda(b_1,b_2,if(b_1,true,b_2));

v_concat = lambda(c_array_thunks,
let(c_row_counts, map(c_array_thunks, lambda(thunk, rows(thunk()))),
    total_rows, sum(c_row_counts),
    // coord(i) = pair(i_thunk,row_within_thunk)
    coord_0, pair(0,0),
    scanner, lambda(p,_,
      let(i_thunk, fst(p),
          row_within_thunk, snd(p),
          // if we need to increment i_thunk?
          if( seq_or(i_thunk=0,                                      // first call, or
                    row_within_thunk=index(c_row_counts,i_thunk,1)), // at end of the previous thunk
             //then
             pair(i_thunk+1,1),
             //else
             pair(i_thunk,row_within_thunk+1)
             )
      )),
    coords, scan(coord_0, sequence(total_rows), scanner),
    maker, lambda(i,_,
      let(p, index(coords,i,1),
          i_thunk, fst(p),
          row_within_thunk, snd(p),
          thunk, index(c_array_thunks,i_thunk,1),
          item, index(thunk(),row_within_thunk,1),
          item )),
    result, makearray(total_rows,1,maker),
    result
));

// ======================================================================================================
// Pairs: number pairs encoded as a text

pair = LAMBDA(x_1,x_2, x_1&":"&x_2);
fst = LAMBDA(p, let(colon,find(":",p), x_1,left(p,colon-1), numbervalue(x_1)));
snd = LAMBDA(p, let(colon,find(":",p), x_2,right(p,len(p)-colon), numbervalue(x_2)));
```
