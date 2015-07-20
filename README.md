# solrValidator

Is a javascript validator for solr queries.

### Dependencies
Works with jquery >= 1.7.1 see also [jquery on github][jquery on github].

### How to use

####Files needed
The `src/solr.validator.messages.js` and `src/solr.validator.js` are needed.
You can include them as follows :

    <script src="./src/solr.validator.messages.js" type="text/javascript"></script>
    <script src="./src/solr.validator.js" type="text/javascript"></script>

####Example 
The following example shows you how to call use the validator.

    <script type="text/javascript">
    	var YOUR_QUERY = "this OR that OR -nothing OR NOT whatever";
    	
        // specify the language for the messages. Options: en (english) and nl (dutch)
    	var validator = new solrValidator("en"); 
    	validator.validate(YOUR_QUERY);
    	
    	if (validator.errorMessages.length == 0) {
    		// Query is valid
    		// pass search on to SOLR
    		alert("this query passes validation");
    	} else {
    		// Do not start search, show error messages
    		for (var i = 0; i < validator.errorMessages.length; i++) {
    			console.log(validator.errorMessages[i]); // add code to show messages
    		}
    	}
    </script>



#### Using strict mode
The validator has 2 validation modes, `normal` and `strict`. `normal` is the default.

#### Whitelisting certain fields
You can set the validator to allow specific fields in the query.

Consider the following query `Golf OR title:theopen` is a valid if you tell the validator to accept the field `title`.

    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //-- All options
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    // language:            nl (dutch) or en (english)              (default: nl)
    // mode:                strict or normal                        (default: normal)
    // allowedSolrFields:   for example "|title:|content:|"         (default: null)
    // maxLength:           max length for query, for example 1000  (default: 4000)
    // UseConsoleLog:       set to true to get detailed logs in the console of how a query is processed. (default: false)
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    var YOUR_QUERY="Golf OR title:theopen";
    
    var validator = new solrValidator("en", "normal","|title:|", 1000, false);
    validator.validate(YOUR_QUERY);
    
    if (validator.errorMessages.length == 0) {
    	// Query is valid
    	// pass search on to SOLR
    	alert("this query passes validation");
    } else {
    	// Do not start search, show error messages
    	for (var i = 0; i < validator.errorMessages.length; i++) {
    		console.log(validator.errorMessages[i]); // add code to show messages
    	}
    }



### More examples

Please check the [test section][Testfiles] for more examples

### Supported languages
Currently only `en` AND `nl` are supported.
New languages can be added in the `solr.validator.messages.js` file.


[jquery on github]:https://github.com/jquery/jquery
[Testfiles]: test/test.html