sap.ui.define([], function () {
	"use strict";
	return {
		selecFn : function(value){
            if (value === "Yes") {
                return "0";
            } else if (value === "No") {
                return "1";
            }
        },
        selectgen: function(values){
            if (values === "Male"){
                return "Male";
            } else if (values == "Female")
            return "Female";

        },
	};
    
});