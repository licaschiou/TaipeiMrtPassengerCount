var asDataframe = function(dataset){
	var df = {};
	var names = Object.keys(dataset[0]);
	for(var i = 0, n = names.length; i < n; i++){
		df[names[i]] = [];
	}
	//for each items in dataset(json)
	for(var i = 0, n = dataset.length; i < n; i++){
		for(var j = 0, m = names.length; j < m; j++){			
			df[names[j]].push(dataset[i][names[j]]);
		}		
	}
	return df;
};


//extracts levels from an array
var levels = function(dataset){
	if(!(dataset instanceof Array)){
		throw new Error("Dataset is not array.");
	}
	var newLevels = [];
	for(var i = 0, n = dataset.length; i < n; i++){
		var newLevel = true;
		for(var j = 0, m = newLevels.length; j < m; j++){
			if(dataset[i] == newLevels[j]){
				newLevel = false;
				break;
			}
		}
		if(newLevel){
			newLevels.push(dataset[i]);
		}
	}
	return newLevels;
};

//count for each level
var table = function(dataset){
	if(!(dataset instanceof Array)){
		throw new Error("Dataset is not an array.");
	}
	var newTable = {};
	for(var i = 0, n = dataset.length; i < n; i++){
		var keyList = Object.keys(newTable);
		var newKey = true;
		for(var j = 0, m = keyList.length; j < m; j++){
			if(dataset[i] == keyList[j]){
				newTable[keyList[j]] ++;
				newKey = false;
				break;
			}
		}
		if(newKey){
			newTable[dataset[i]] = 1;
		}
	}
	return newTable;
};

var objectToArray = function(tb){
	var newArray = [];
	var keyList = Object.keys(tb);
	for(var j = 0, m = keyList.length; j < m; j++){
		var cell = {
				category : "",
				count : 0
		};
		cell.category = keyList[j];
		cell.count = tb[keyList[j]];
		newArray.push(cell);
	}
	return newArray;
};

//e.g. twoWayTable(dataset, "產地", "原因")
//Input : json data
var twoWayTable = function(dataset, var1, var2){
	if(!(dataset instanceof Object)){
		throw new Error("Dataset is not an object.");
	}
	// Scalffolding
	var df = asDataframe(dataset);
	var colNames = levels(df[var1]);
	var rowNames = levels(df[var2]);
	var newTable = [];

	for(var y = 0, numRow = rowNames.length; y < numRow; y++){			
		for(var x = 0, numCol = colNames.length; x < numCol; x++){		
			var cell = {
				count : 0
			};
			cell[var1] = colNames[x];
			cell[var2] = rowNames[y];
			newTable.push(cell);
		}
	}
	//count data
	for(var i = 0, n = dataset.length; i < n; i++){
		for(var j = 0, m = newTable.length; j < m; j++){
			if(
				(dataset[i][var1] == newTable[j][var1]) &&
				(dataset[i][var2] == newTable[j][var2]) 
			){
				newTable[j].count ++;
				break;
			}
		}
	}
	return newTable;
};