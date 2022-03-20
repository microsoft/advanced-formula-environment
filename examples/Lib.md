### Description
A collection of basic functions on arrays and texts.

### Code
```
// Lib - a library of basic operations on Excel types

// ======================================================================================================
// Testing infrastructure
// To test everything, put =DoIt into cell A1 (or any cell) 

test_text =  
  textjoin("|", TRUE
    , totext_test
    , test_nfib
    , test_stack_depth
    , test_textsplit
    , test_vstack
    , test_pair
    , test_1_vconcat
    , test_2_vconcat
    );
    
DoIt =
  let( ms_value, timer(LAMBDA(test_text))
     , ms, fst(ms_value)
     , results, snd(ms_value)
     , results_text, index(results,1,1) // coerce from [1x1] array sometimes returned by textjoin
     , header, "Total DoIt time " & ms & "ms||"
    , transpose(textsplit(header & results_text,"|"))
  );

// ======================================================================================================
// go is a test runner for writing tests.
 
go = LAMBDA(thunk,expected,
  let(ms_value, timer(thunk)
     , ms, fst(ms_value)
     , value, snd(ms_value)
     , ms & "ms " &
       IF( totext(value)=totext(expected)
         , "Pass got "&totext(value)&" as expected"
         , "Fail got "&totext(value)&" but expected "&totext(expected)
         )
     )
);

// ======================================================================================================
// Excel type codes and the totext function, to turn any type into a text

// Excel TYPE codes
TYPE_Number = 1;
TYPE_Text = 2;
TYPE_Logical = 4;
TYPE_Error = 16;
TYPE_Array = 64;

is_text = lambda(value, type(value)=TYPE_Text);
is_error = lambda(value, type(value)=TYPE_Error);

// typeof
typeof = lambda(value,
  switch( type(value)
        , TYPE_Number, "number"
        , TYPE_Text, "text"
        , TYPE_Logical, "logical"
        , TYPE_Error, "error"
        , TYPE_Array, "["& rows(value) &"x" & columns(value) &"]"
        )
);

// turn any value, array or not, into a single string
totext = lambda(value,
  IF( TYPE(value)=TYPE_Array
    , arraytotext(value,1)
    , valuetotext(value,1)
    ));

// show different types of literals
totext_test =
 textjoin(" ", TRUE
         , totext( TRUE )
         , totext( pi() )
         , totext( 42 )
         , totext( 01/01/2021 )
         , totext( "Menen" )
         , totext( "12345678" )
         , totext( #VALUE! )
         , totext( {1,2,3} )
         , totext( TRANSPOSE({1,2,3}) )
         , totext( LAMBDA(x,x) )
         );

// ======================================================================================================
// Timing a computation wrapped in a thunk

timer = LAMBDA(thunk,
  LET( time_0, NOW()
     , value, thunk()
     , time_1, NOW()
     , days, time_1 - time_0
     , ms, days * 24 * 60 * 60 * 1000 // milliseconds (resolution 10ms on desktop)
     , pair(round(ms,0),value)
     )
);

// ======================================================================================================
// Simple examples of recursion

// nfib benchmark (nfib(30)  takes about 2s on desktop). Careful, no interrupt.
nfib = LAMBDA(n,
  if(n<2, 1, 1 + nfib(n-1) + nfib(n-2))
);
test_nfib = go(lambda( nfib(22) ), 57313);

mytest = go(LAMBDA( nfib(22 )), 57313);

// stack depth - test how deep we can go
// when stack depth exceeded, we get the #NUM! error
// for example, stack_depth(342)=#NUM!
stackdepth = LAMBDA(depth,
  IF(depth<=1, 1, 1+stackdepth(depth-1))
);
d=5300; // 5300 works
test_stack_depth = go( lambda(stackdepth(d)), d );

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

test_textsplit =
  go( lambda(textsplit("one,,two,three",","))
    , {"one", "", "two", "three"}
    );

// ======================================================================================================
// Vectors: functions to make row and column vectors

r_vector =
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

c_vector =
lambda([x_1],[x_2],[x_3],[x_4],[x_5],[x_6],[x_7],[x_8],[x_9],[x_10],
let(row, r_vector(x_1,x_2,x_3,x_4,x_5,x_6,x_7,x_8,x_9,x_10),
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
        blank, "",
        makearray(rows_1+rows_2, MAX(cols_1,cols_2), lambda(i,j,
          IF(i<=rows_1,
             IF(j<=cols_1,INDEX(array_1,i,j),blank),
             IF(j<=cols_2,INDEX(array_2,i-rows_1,j),blank)) ))
    ));

test_vstack =
  go( lambda(Lib.VSTACK(SEQUENCE(3,4), SEQUENCE(4,5)))
    , {1,2,3,4,"";5,6,7,8,"";9,10,11,12,"";1,2,3,4,5;6,7,8,9,10;11,12,13,14,15;16,17,18,19,20}
    );

// hstack(array_1,array_2) returns the array obtained by stacking array_1 and array_2 horizontally.
hstack =
  LAMBDA(array_1,array_2,
    LET(rows_1, ROWS(array_1),
        rows_2, ROWS(array_2),
        cols_1, COLUMNS(array_1),
        cols_2, COLUMNS(array_2),
        blank, " ",
        makearray(MAX(rows_1,rows_2), cols_1+cols_2, lambda(i,j,
          IF(j<=cols_1,
             IF(i<=rows_1,INDEX(array_1,i,j),blank),
             IF(i<=rows_2,INDEX(array_2,i,j-cols_1),blank)) ))
    ));

// ======================================================================================================
// Array concatenation: v_concat { thunk1; ... thunkN } where each thunki=lambda(arrayi)
// computes the vertical stack of array1,...,arrayN, with blank padding to the right.

test_1_vconcat =
  LET(sample_input, c_vector(lambda({1,10;2,20;3,30}), lambda({"four";5}), lambda({1,2,3})),
      go( lambda(vconcat(sample_input)), {1,10,"";2,20,"";3,30,"";"four","","";5,"","";1,2,3} ));

test_2_vconcat =
  let(sample_input, c_vector(lambda({1,10;2,20;3,30})),
      go( lambda(vconcat(sample_input)), {1,10;2,20;3,30} ));

seq_or = lambda(b_1,b_2,if(b_1,true,b_2));

vconcat = lambda(c_array_thunks,
let(c_row_counts, map(c_array_thunks, lambda(thunk, rows(thunk()))),
    total_rows, sum(c_row_counts),
    max_columns, reduce(1,c_array_thunks,lambda(acc,thunk,max(acc,columns(thunk())))),
    // coord(i) = pair(i_thunk,row_within_thunk)
    coord_0, num_pair(0,0),
    scanner, lambda(p,_,
      let(i_thunk, num_fst(p),
          row_within_thunk, num_snd(p),
          // if we need to increment i_thunk?
          if( seq_or(i_thunk=0,                                      // first call, or
                    row_within_thunk=index(c_row_counts,i_thunk,1)), // at end of the previous thunk
             //then
             num_pair(i_thunk+1,1),
             //else
             num_pair(i_thunk,row_within_thunk+1)
             )
      )),
    coords, scan(coord_0, sequence(total_rows), scanner),
    maker, lambda(i,j,
      let(p, index(coords,i,1),
          i_thunk, num_fst(p),
          row_within_thunk, num_snd(p),
          array, index(c_array_thunks,i_thunk,1)(),
          item, if(j<=columns(array),index(array,row_within_thunk,j),""),
          item)),
    result, makearray(total_rows,max_columns,maker),
    result
));

// ======================================================================================================
// Flatten 2D matrix into row or column vector.

flatten_to_row =
LAMBDA(array,
LET(rows, ROWS(array),
    cols, COLUMNS(array),
    array, makearray(1,rows*cols,lambda(i,j, index(array,floor.math((j-1)/cols)+1,mod(j-1,cols)+1) )),
    array
));

flatten_to_column =
LAMBDA(array,
LET(rows, ROWS(array),
    cols, COLUMNS(array),
    array, makearray(rows*cols,1,lambda(i,j, index(array,floor.math((i-1)/cols)+1,mod(i-1,cols)+1) )),
    array
));

// ======================================================================================================
// Pairs: encoded with LAMBDA, so we can store arbitrary values including arrays
// We can store these in arrays, because we can store LAMBDA in arrays, but not in cells.

pair = LAMBDA(x_1,x_2, LAMBDA(j,switch(j,1,x_1,2,x_2)));
fst = LAMBDA(p, p(1));
snd = LAMBDA(p, p(2));
test_pair = go(  lambda(snd(pair( {1,2}, {3,4} ))), {3,4} );

// ======================================================================================================
// Pairs: number pairs encoded as a text. Faster than LAMBDA encoded pairs.

num_pair = LAMBDA(x_1,x_2, x_1&":"&x_2);
num_fst = LAMBDA(p, let(colon,find(":",p), x_1,left(p,colon-1), numbervalue(x_1)));
num_snd = LAMBDA(p, let(colon,find(":",p), x_2,right(p,len(p)-colon), numbervalue(x_2)));

// ======================================================================================================
// set of strings represented as #NULL! (if the set is empty), or a row vector (if set is non-empty)
// Remember that a single string looks and behaves like a 1x1 array

empty_set = #NULL!;
is_empty_set = is_error;
union = lambda(set_1, set_2,
  if(is_empty_set(set_1), set_2,
  if(is_empty_set(set_2), set_1,
  unique(Lib.hstack(set_1,set_2),TRUE))));
set_from_spaced_string = lambda(string, IF(string="",empty_set,Lib.textsplit(string," ")));
spaced_string_from_set = lambda(set, TEXTJOIN(" ",TRUE,set));
member = LAMBDA(quarry,set,IF(is_empty_set(set),FALSE,REDUCE(FALSE,set,lambda(acc,item,OR(acc,item=quarry)))));
```
