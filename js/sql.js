
function queryCreate(fields, table){
	q = "CREATE TABLE IF NOT EXISTS " + table + " (";
	q += addKeys(fields);
	q += ")";
	return q;
}

function addKeys(fields){
	var nq;
	for (var key in fields) {
    	nq += fields[key] + ", ";
	}
	nq.slice(0, -1);
	console.log(nq);
	return nq;
}