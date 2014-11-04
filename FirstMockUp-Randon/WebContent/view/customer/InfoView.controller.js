sap.ui.controller("com.sap.randon.view.customer.InfoView", {

	_formFragments : {},

	_getFormFragment : function(sFragmentName) {
		if (!this._formFragments[sFragmentName]) {
			this._formFragments[sFragmentName] = sap.ui.xmlfragment("myprefix",
					this.getView().getControllerName() + "." + sFragmentName);
		}
		return this._formFragments[sFragmentName];
	},
	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf view.customer.InfoView
	 */
	onInit : function() {
		var oForm = this._getFormFragment("formDisplay");
		this.getView().byId("idFormContainer").insertContent(oForm);
		this.getView().bindElement("/SupplierCollection/0");
	},

	handleFooterBarButtonPress: function(oEvent) {

	    // Derive action from the button pressed
	    var bEditAction = /idButtonEdit$/.test(oEvent.getSource().getId());

	    // Show the appropriate action buttons
	    this.getView().byId("idButtonEdit").setVisible(! bEditAction);
	    this.getView().byId("idButtonSave").setVisible(bEditAction);
	    this.getView().byId("idButtonCancel").setVisible(bEditAction);

	    // Set the right form type
	    oForm = this._getFormFragment(bEditAction ? "formChange" : "formDisplay");
	    var oContainer = this.getView().byId("idFormContainer");
	    oContainer.removeContent(0);
	    oContainer.insertContent(oForm);
	  }
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf view.customer.InfoView
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf view.customer.InfoView
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf view.customer.InfoView
 */
// onExit: function() {
//
// }
});