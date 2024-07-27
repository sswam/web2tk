(function($) {

var log = Function.prototype.bind.call(console.log, console);

/**
* Parses a custom-record formatted string into an array of objects.
* Each record is separated by double newlines and key-value pairs are separated by ": ".
* @param {string} data - The data string to parse.
* @returns {Array} - An array of parsed record objects.
*/
function parse_rec(data) {
	var records = data.split('\n\n');
	var n = records.length;
	var names = [];
	var names_set = {};

	if (n && records[n-1] === '') {
		records.pop(); --n;
	}

	for (var i=0; i<n; ++i) {
		var lines = records[i].split('\n');
		records[i] = {};
		var m = lines.length;
		for (var j=0; j<m; ++j) {
			var kv = lines[j].split(':\t');
			var k = kv[0], v = kv[1];
			records[i][k] = v;
			if (!names_set[k]) {
				names_set[k] = 1;
				names.push(k);
			}
		}
	}

	for (var i=0; i<n; ++i) {
		for (var j=0; j<names.length; ++j) {
			var k = names[j];
			if ($.type(records[i][k]) == 'undefined') {
				records[i][k] = null;
			}
		}
	}

	log(names);
	return records;
}

/**
* Parses a TSV (Tab-Separated Values) formatted string into an array of objects.
* @param {string} data - The TSV data string to parse.
* @returns {Array} - An array of parsed record objects.
*/
function parse_tsv(data) {
	var records = data.split('\n');
	var n = records.length;

	if (n && records[n-1] === '') {
		records.pop(); --n;
	}

	var names = records.shift().split('\t'); --n;
	var w = names.length;

	for (var i=0; i<n; ++i) {
		var fields = records[i].split('\t');
		records[i] = {};
		for (var j=0; j<w; ++j) {
			var k = names[j];
			var v = fields[j];
			if ($.type(v) == 'undefined') {
				v = '';
			}
			records[i][k] = v;
		}
	}
	return records;
}

/**
* Ensures a URL is well-formed; prefixes with "mailto:" or "http://" as necessary.
* @param {string} data - The URL or email string to fix.
* @returns {string} - The fixed URL.
*/
function fix_url(data) {
	data = "" + data;
	if (data.match(/:\/\//)) {
		// Do nothing, URL is well-formed
	} else if (data.match(/@/)) {
		data = "mailto:" + data;
	} else {
		data = "http://" + data;
	}
	return data;
}

/**
* Binds data to a jQuery element.
* Handles array, object, and primitive types accordingly.
* @param {jQuery} $e - The jQuery element to bind data to.
* @param {any} data - The data to bind.
*/
function bind($e, data) {
	var data_type = $.type(data);
	if (!$e.length)
		return;

	var node_type = $e[0].nodeName;
	var n_child = $e.children().length;

	if (data_type == 'array') {
		bind_array($e, data);
	} else if (data_type == 'object') {
		bind_object($e, data);
	} else if (data_type == 'undefined' || data_type === 'null') {
		$e.remove();
	} else if ($e.is('input,select')) {
		$e.val("" + data);
	} else if ($e.is('a')) {
		$e.prop('href', fix_url(data));
		$e.text("" + data);
	} else {
		$e.text("" + data);
	}
}

/**
* Binds an array of data to a jQuery element.
* Clones the element for each item in the array and binds the item data to it.
* @param {jQuery} $e - The jQuery element to clone and bind data to.
* @param {Array} ary - The array of data to bind.
*/
function bind_array($e, ary) {
	var $t = $e.first();
	$e.slice(1).remove();
	var $p = $t.parent();
	var n = ary.length;
	var out = [];

	for (var i=0; i<n; ++i) {
		var $o = $t.clone();
		bind($o, ary[i]);
		out.push($o);
	}
	$t.replaceWith(out);
}

/**
* Binds an object of data to a jQuery element.
* Recursively binds data to child elements with matching class names or tags.
* @param {jQuery} $e - The jQuery element to bind data to.
* @param {Object} obj - The object of data to bind.
*/
function bind_object($e, obj) {
	for (var k in obj) {
		if (!obj.hasOwnProperty(k)) {
			continue;
		}
		var v = obj[k];
		bind($e.find(k+', '+'.'+k), v);
	}
}

/**
* Ensures that the HTML content is displayed.
*/
function show() {
	$('html').css('display', 'block');
}

/**
* Extracts the file extension from a filename.
* @param {string} filename - The filename to extract the extension from.
* @returns {string} - The file extension.
*/
function file_extension(filename) {
	return filename.split('.').pop();
}

/**
* Main template function to fetch the data and bind it to the specified element.
* @param {string} element - The selector for the element to bind data to.
* @param {string} data_url - The URL to fetch the data from.
*/
$.templa = function(element, data_url) {
	log(data_url);
	$.get(data_url, function(text) {
		text = text.replace(/\r/g, '');
		var ext = file_extension(data_url);
		var data;

		if (ext === 'txt') {
			data = parse_rec(text);
		} else if (ext === 'json') {
			data = $.parseJSON(text);
		} else if (ext === 'tsv') {
			data = parse_tsv(text);
		}

		log(JSON.stringify(data, null, 4));
		bind($(element), data);
		show();
	});
}

})(jQuery);

/**
* Comments, ideas, suggested changes:
*
* 1. Consider adding error handling in the $.get call in $.templa to gracefully handle failed data fetches.
* 2. Ensure consistent formatting, e.g., insert spaces after commas in argument lists.
* 3. In function `bind_object`, it might be more efficient to cache `find` results if the same key is used multiple times.
* 4. Add explicit type checks for URLs in fix_url instead of relying on regex matches.
* 5. Enhance documentation by describing edge cases and possible return values or actions for each function.
* 6. Consider adding more validation for input data to handle unexpected formats or types.
* 7. Could add tests for each function to ensure reliability and make maintenance easier.
*/
