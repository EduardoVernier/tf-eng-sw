sap.ui.controller("com.sap.randon.view.adm.PendingTestsDetailView", {
	handleNavButtonPress : function(evt) {
		this.nav.app.backToTopMaster();
	},

	rejectPendingTest : function(evt) {
		var context = this.getView().byId("admPendingTestsDetailPage")
				.getBindingContext();
		var id = context.getProperty("id");

		// REMOVE FROM MODEL
		// TODO remove from db
		// TODO get reason for rejection
		var pending = RequestedTestsMockData.pendingTests;
		for ( var i = 0; i < pending.length; i++) {
			if (pending[i].id == id) {
				RequestedTestsMockData.pendingTests.splice(i,1);
				break;
			}
		}
		sap.ui.getCore().getEventBus().publish("model", "refresh");
		if (RequestedTestsMockData.pendingTests.length == 0)
			this.nav.app.backToTopDetail();
		},

	acceptPendingTest : function(evt) {
		var context = this.getView().byId("admPendingTestsDetailPage")
				.getBindingContext();
		var id = context.getProperty("id");

		// REMOVE FROM MODEL
		// TODO remove from db
		var pending = RequestedTestsMockData.pendingTests;
		for ( var i = 0; i < pending.length; i++) {
			if (pending[i].id == id) {
			
				var accepted  = RequestedTestsMockData.pendingTests.splice(i,1)[0];
				
				accepted.testData["responsibleOperator"] = 
					this.getView().byId("responsibleOper")
						.getSelectedItem().getText();
				accepted.status = "Em Andamento";
				RequestedTestsMockData.runningTests.push(
					accepted
				);
				break;
			}
		}
		sap.ui.getCore().getEventBus().publish("model", "refresh");
		if (RequestedTestsMockData.pendingTests.length == 0)
			this.nav.app.backToTopDetail();
		}
/**
 * Called when a controller is instantiated and its View controls (if available)
 * are already created. Can be used to modify the View before it is displayed,
 * to bind event handlers and do other one-time initialization.
 * 
 * @memberOf view.PendingTestsDetailView
 */
// onInit: function() {
//
// },
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf view.PendingTestsDetailView
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf view.PendingTestsDetailView
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf view.PendingTestsDetailView
 */
// onExit: function() {
//
// }
});