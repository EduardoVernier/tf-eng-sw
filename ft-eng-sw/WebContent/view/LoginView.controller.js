sap.ui.controller("com.sap.randon.view.LoginView", {
	
	handleLogon : function (evt) {
		var bus = sap.ui.getCore().getEventBus();
		
		switch (this.getView().byId("user").getValue()) {
        case '1':
        case "Customer" :
        	bus.publish("nav", "to", {
    			id : "CustomerView",
    			data : {
    				context : null
    			}
    		});        	
 			break;
        case '2':
        case "Admin":
        	bus.publish("nav", "to", {
    			id : "AdmView",
    			data : {
    				context : null
    			}
    		});        	
 			break;
        case '3':
        case "Operator":
        	bus.publish("nav", "to", {
    			id : "OperatorView",
    			data : {
    				context : null
    			}
    		});        	
 			break;
        default:
        	alert("Invalid login.");      	
 			break;
		}
		
	},
	
	handleRegister : function (evt) {
		sap.ui.getCore()
			.getEventBus()
			.publish("nav", "to", {
				id : "RegisterView",
				data : {
					context : null
				}
			});
	}
	
	
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.LoginView
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.LoginView
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.LoginView
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.LoginView
*/
//	onExit: function() {
//
//	}

});