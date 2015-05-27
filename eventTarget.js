var EventTarget = function(){
	Object.defineProperty(this, "__listeners", {
		value : {}
	});
}

Object.defineProperties(EventTarget.prototype,{
	addListener : {
		value : function(type, listener){
			if(typeof this.__listeners[type] === "undefined"){
				this.__listeners[type] = [];
			}
			this.__listeners[type].push(listener);
		},
		enumerable : true
	},
	removeListener : {
		value : function(type, listener){
			var listeners = this.__listeners[type];
			if(typeof listeners === "undefined"){
				return;
			}
			for(var i = 0, len = listeners.length; i < len; i++){
				if(listeners[i] === listener){
					listeners.splice(i, 1);
					break;
				}
			}
		},
		enumerable : true
	},
	__fire : {
		//How this works
		//This function only takes an Object as parameter
		//This means we have to use this function like __fire({type:"load"});
		value : function(eventObject){
			if(!(eventObject instanceof EventType)){
				throw new Error("Event object is not of correct type");
			}
			//Then we check if this object have a "type" property
			if(typeof eventObject.type === "undefined"){
				throw new Error("Event object needs type.");
			}
			//Then we check if this object have a "target" property
			//If not, we set the target to this (EventTarget object)
			//Which makes sure that this event is fired from this object
			if(typeof eventObject.target === "undefined"){
				eventObject.target = this;
			}
			//Then we get the list of items that are listening to this event type
			var listeners = this.__listeners[eventObject.type];
			if(typeof listeners === "undefined"){
				return;
			}
			// The call method is used to invoke a function in a particular context 
			// (in other words, with a specific value for this). 
			// Which means 
			// 1. the liseners are both functions.
			// 2. call() takes two arguments, this, and eventObject
			//    this = the context, the EventTarget object
			//    eventObject, the object we pass to __fire() function
			//    because we pass {type:"load"}, so in listerners1
			//    alert(evt.type) will pop out "load"
	
			for(var i = 0, len = listeners.length; i < len; i++){
				listeners[i].call(this, eventObject);
			}
		}
	}
});

var EventType = function(type){
	if(typeof type != "string"){
		throw new Error("type must be a string");
	}
	Object.defineProperty(this, "type", {
		value : type,
		enumerable : true
	});
}

