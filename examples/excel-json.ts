// json-excel.ts
// Load this code file using ScriptLab to make JSON functionality available as custom functions in Excel
// Documentation: https://docs.microsoft.com/en-us/office/dev/add-ins/excel/excel-data-types-overview

/**
 * GET JSON from URL.
 * @customfunction
 * @param {string} url
 * @returns {any} Results of the query.
 */
 async function get_json(url) {
    const options = {
      method: "GET"
    };
  
    //console.log(url);
    //console.log(options);
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return value_to_excel(result);
    } catch (err) {
      console.log(err);
      return value_to_excel("caught: " + err.message);
    }
  }
  
  /**
   * GET JSON lines from URL.
   * @customfunction
   * @param {string} url
   * @returns {any} Results of the query.
   */
  async function get_json_lines(url) {
    const options = {
      method: "GET"
    };
  
    //console.log(url);
    //console.log(options);
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const text = await response.text();
      const jsons = await text.split("\n");
      var N = jsons.length-1;  // last entry will be an empty string following last "\n"
      var array = new Array(N);
      for (var i = 0; i < N; i++) {
        const json = jsons[i];
        try {
          array[i] = JSON.parse(jsons[i]);
        }
        catch(err) {
          array[i] = "error parsing: "+json+"length "+json.length;
          //console.log(array[i]);
        }
      }
      const excel = value_to_excel({"lines":array});
      //console.log(array);
      return excel;
    } catch (err) {
      console.log(err);
      return value_to_excel("caught: " + err.message);
    }
  }
  
  /**
   * POST JSON to URL.
   * @customfunction
   * @param {string} url
   * @param {any} json_data
   * @returns {any} Results of the query.
   */
  async function post_json(url, json_data) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: json_data
    };
  
    //console.log(options);
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return value_to_excel(result);
    } catch (err) {
      console.log(err);
      return value_to_excel("caught: " + err.message);
    }
  }
  
  /**
   * Encode part of URI
   * @customfunction
   * @param {string} text
   * @returns {string} URI encoded text
   */
  function encodeURI(text: string) {
    return encodeURIComponent(text);
  }
  
  /**
   * Constructs a Yellow entity
   * @customfunction
   * @param {string} json
   * @returns {any} Yellow value
   */
  function parse_JSON(json: string) {
    const obj = JSON.parse(json);
    return value_to_excel(obj);
  }
  
  const nullErrorValue = {
    type: "Error",
    basicType: "Error",
    basicValue: "#NULL!"
  };
  
  function value_to_excel(value) {
    // recall that typeof null == "object"
    if (value == null) return nullErrorValue;
    switch (typeof value) {
      case "boolean":
        return {
          type: "Boolean",
          basicValue: value
        };
  
      case "string":
        return {
          type: "String",
          basicValue: value
        };
  
      case "number":
        return {
          type: "Double",
          basicValue: value
        };
  
      case "object":
        if (value.constructor === Array) {
          const length = value.length;
          if (length == 0) return nullErrorValue; // Excel has no empty arrays
  
          var rows = new Array(length);
          for (var i = 0; i < length; i++) rows[i] = [value_to_non_array_excel(value[i])];
          return {
            type: "Array",
            elements: rows
          };
        }
  
        const obj = value as Object;
        var keys = "";
        var outcome: Object = {};
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            var lowerKey = key.toLowerCase();
            while(outcome.hasOwnProperty(lowerKey)) // make the lower case key unique, if need be
              lowerKey += "9";
            if (keys=="")
              keys = lowerKey;
            else
              keys = keys+","+lowerKey;
            const value = obj[key];
            outcome[lowerKey] = value_to_excel(value);
          }
        }
  
        return {
          type: "Entity",
          text: keys,
          properties: outcome
        };
  
      default:
        return {
          type: "String",
          basicValue: "DEFAULT - unexpected"
        };
    }
  }
  
  // Excel does not support an array nested inside another, so wrap in an entity
  function value_to_non_array_excel(value) {
    if (value == null) return nullErrorValue;
    const excel = value_to_excel(value);
    switch (typeof value) {
      case "object":
        if (value.constructor === Array) {
          return {
            type: "Entity",
              text: "Nested array",
              properties: excel
          };
        }
        return excel;
  
      default:
        return excel;
    }
  }
  
  
