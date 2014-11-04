sap.ui.controller("com.sap.randon.view.adm.RunningTestsView", {
	handleNavButtonPress : function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	},

	selectedRunningTestList : function(evt) {
		var app = this.app;

		if (!this.detailPage) {
			this.detailPage = sap.ui.xmlview("AdmRunningTestsDetailView",
					"com.sap.randon.view.adm.RunningTestsDetailView");
			app.addPage(this.detailPage, false);
		}
		
		var context = evt.getParameter("listItem").getBindingContext();

		this.app.to("AdmRunningTestsDetailView");
		
		this.detailPage.setBindingContext(context);
		
	},
	
	
	selectedRunningTestItem : function (evt) {
		
		var context = evt.getSource().getBindingContext();
		
		this.app.to("AdmRunningTestsDetailView");
		
		this.detailPage.setBindingContext(context);
	},
	

	
	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf view.RequestedTestsView
	 */
	onInit : function() {
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		this.getView().setModel(i18nModel, "i18n");
		this.app = this.getView().byId("runningTestsApp");
		this.getView().addStyleClass("sap-font-open-sans");
		this.emptyPage = new sap.ui.xmlview("AdmEmpty_Running", "com.sap.randon.view.Empty");
		this.app.addPage(this.emptyPage, false);
		this.detailPage = new sap.ui.xmlview("AdmRunningTestsDetailView", "com.sap.randon.view.adm.RunningTestsDetailView");
		this.detailPage.getController().nav = this;

		this.app.addPage(this.detailPage, false);
		
		
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			isNoPhone : ! jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		this.getView().setModel(deviceModel, "device");
	},
	
	handleSearch : function (evt) {
		var filters = [];
		var query = evt.getParameter("query");
		if (query && query.length > 0) {
			var filter = new sap.ui.model.Filter("companyName",
												 sap.ui.model.FilterOperator.Contains,
												 query);
			filters.push(filter);
		}
		var list = this.getView().byId("pendingTestsList");
		var binding = list.getBinding("items");
		binding.filter(filters);
	}
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.adm.RunningTestsView
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.adm.RunningTestsView
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.adm.RunningTestsView
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.adm.RunningTestsView
*/
//	onExit: function() {
//
//	}

});