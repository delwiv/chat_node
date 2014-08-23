function User(name){
	this.name = name;
	this.status = "inactive";
	this.id = "";
}

function getIndex(arr,name) {
	for (var i = 0 ; i < arr.length ; i++ ){
		if ( arr[i].name === name) {
			return i;
		}
	}
    return -1;
}