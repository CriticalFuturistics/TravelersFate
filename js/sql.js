
function queryCreate(fields, table){
	q = "CREATE TABLE IF NOT EXISTS " + table + " (";
	q += addKeys(fields);
	q += ")";
	return q;
}

function getKeysArray(fields){
	var array = [];
	for (var key in fields) {
    	array.push(fields[key]);
	}
	return array;
}