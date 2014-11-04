sap.ui.controller("com.sap.randon.view.adm.PendingTestsView", {
	handleNavButtonPress : function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	},

	selectedPendingTestList : function(evt) {
		var app = this.app;

		if (!this.detailPage) {
			this.detailPage = sap.ui.xmlview("AdmPendingTestsDetailView",
					"com.sap.randon.view.adm.PendingTestsDetailView");
			app.addPage(this.detailPage, false);
		}
		
		var context = evt.getParameter("listItem").getBindingContext();

		this.app.to("AdmPendingTestsDetailView");
		
		this.detailPage.setBindingContext(context);
		
	},
	
	
	selectedPendingTestItem : function (evt) {
		
		var context = evt.getSource().getBindingContext();
		
		this.app.to("PendingTestsDetailView");
		
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
		this.app = this.getView().byId("requestedTestsApp");
		this.getView().addStyleClass("sap-font-open-sans");
		this.emptyPage = new sap.ui.xmlview("AdmEmpty", "com.sap.randon.view.Empty");
		this.app.addPage(this.emptyPage, false);
		this.detailPage = new sap.ui.xmlview("AdmPendingTestsDetailView", "com.sap.randon.view.adm.PendingTestsDetailView");
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
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf view.RequestedTestsView
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf view.RequestedTestsView
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf view.RequestedTestsView
 */
// onExit: function() {
//
// }
});