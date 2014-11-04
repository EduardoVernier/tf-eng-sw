sap.ui.controller("com.sap.randon.view.operator.RunningTestsView", {
	handleNavButtonPress : function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
		this.app.backToTopDetail();
		var list = this.getView().byId("runningTestsList");
		if (list.getItems().length > 0) {
			list.setSelectedItem(list.getItems()[0], false);
		}
	},
	selectedRunningTestList : function(evt) {
		var app = this.app;

		var context = evt.getParameter("listItem").getBindingContext();

		this.app.to("OpRunningTestsDetailView");

		this.detailPage.setBindingContext(context);

	},

	selectedRunningTestItem : function(evt) {

		var context = evt.getSource().getBindingContext();

		this.app.to("OpRunningTestsDetailView");

		this.detailPage.setBindingContext(context);
	},
	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf view.customer.RunningTestsView
	 */
	onInit : function() {
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		this.getView().setModel(i18nModel, "i18n");
		this.app = this.getView().byId("runningTestsApp");
		this.getView().addStyleClass("sap-font-open-sans");
		this.emptyPage = new sap.ui.xmlview("OpRunningEmpty",
				"com.sap.randon.view.Empty");
		this.app.addPage(this.emptyPage, false);
		this.detailPage = new sap.ui.xmlview("OpRunningTestsDetailView",
				"com.sap.randon.view.operator.RunningTestsDetailView");
		this.detailPage.getController().nav = this;

		this.app.addPage(this.detailPage, false);

		var deviceModel = new sap.ui.model.json.JSONModel(
				{
					isPhone : jQuery.device.is.phone,
					isNoPhone : !jQuery.device.is.phone,
					listMode : (jQuery.device.is.phone) ? "None"
							: "SingleSelectMaster",
					listItemType : (jQuery.device.is.phone) ? "Active"
							: "Inactive"
				});
		deviceModel.setDefaultBindingMode("OneWay");
		this.getView().setModel(deviceModel, "device");
	}
/**
 * Called when a controller is instantiated and its View controls (if available)
 * are already created. Can be used to modify the View before it is displayed,
 * to bind event handlers and do other one-time initialization.
 * 
 * @memberOf view.operator.RunningTestsView
 */
// onInit: function() {
//
// },
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf view.operator.RunningTestsView
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf view.operator.RunningTestsView
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf view.operator.RunningTestsView
 */
// onExit: function() {
//
// }
});