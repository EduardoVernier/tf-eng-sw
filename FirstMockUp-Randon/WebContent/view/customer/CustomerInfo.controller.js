sap.ui.controller("com.sap.randon.view.customer.CustomerInfo", {
	handleNavButtonPress : function (evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	}, 
	
	editFields : function (evt)	{
		var view = this.getView();
		
		view.byId("clientName").setEnabled(true);
		view.byId("sector").setEnabled(true);
		view.byId("cnpj").setEnabled(true);
		view.byId("category").setEnabled(true);
		view.byId("address").setEnabled(true);
		view.byId("city").setEnabled(true);
		view.byId("cep").setEnabled(true);
		view.byId("phone").setEnabled(true);
		
		view.byId("editButton").setVisible(false);
		view.byId("submitButton").setVisible(true);
		
	},
	
	submitFields : function (evt){
		var view = this.getView();

		view.byId("clientName").setEnabled(false);
		view.byId("sector").setEnabled(false);
		view.byId("cnpj").setEnabled(false);
		view.byId("category").setEnabled(false);
		view.byId("address").setEnabled(false);
		view.byId("city").setEnabled(false);
		view.byId("cep").setEnabled(false);
		view.byId("phone").setEnabled(false);		
		
		view.byId("editButton").setVisible(true);
		view.byId("submitButton").setVisible(false);
	}
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.customer.CustomerInfo
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.customer.CustomerInfo
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.customer.CustomerInfo
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.customer.CustomerInfo
*/
//	onExit: function() {
//
//	}

});