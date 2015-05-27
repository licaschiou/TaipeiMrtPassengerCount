var DataLoadedEvent = function(data){
	EventType.call(this, "dataLoaded");

	Object.defineProperty(this, "data", {
		value: data,
		enumerable : true
	});
}
DataLoadedEvent.prototype = Object.create(EventType.prototype);

var MultiDataLoader = function(urlArray){
	EventTarget.call(this);
	Object.defineProperties(this,{
		__url : {
			value : urlArray
		},
		__fileCount : {
			value : urlArray.length
		},
		__fileLoaded : {
			value : 0,
			writable: true
		}
	});
}
var csv = d3.dsv(",", "text/csv; charset=big5");
MultiDataLoader.prototype = Object.create(EventTarget.prototype, {
	startLoading : {
		value : function(){
			var loader = this;
			for(var i = 0, n = this.__url.length; i < n; i++){
				var dataurl = this.__url[i];
				var dataType = dataurl.split(".")[1];
				if(dataType === "json"){
					d3.json(dataurl, function(d){
						loader.fileLoaded(d);	
					});
				}else if(dataType === "csv"){
					csv(dataurl, function(d){
						loader.fileLoaded(d);
					});
				}
			}			
		},
		enumerable : true
	},
	fileLoaded : {
		value : function(d){
			rawData.push(d);
			this.__fileLoaded ++;			
			if(this.__fileLoaded === this.__fileCount){
				this.__fire(
					new DataLoadedEvent(d)
				);
			}
		},
		enumerable : true
	}
});
