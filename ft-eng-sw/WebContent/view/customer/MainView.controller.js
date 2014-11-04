jQuery.sap.require("com.sap.randon.util.RequestedTestsMockData");
jQuery.sap.require("com.sap.randon.util.Formatter");
sap.ui.controller("com.sap.randon.view.customer.MainView", {

	popover : null,

	handleTileMove : function (evt) {

	},
	handleRearrangePress : function (evt) {
		var container = this.getView().byId("container");
		var newValue = !this.getView().byId("container").getEditable();
		container.setEditable(newValue);
		evt.getSource().setText((newValue) ? "Concluir" : "Reordenar");
		evt.getSource().setIcon(
				(newValue) ? "sap-icon://accept" : "sap-icon://edit");
		this.isRearranging = newValue;
	},

	handleLogoutPress : function (evt) {
		var oSrc = evt.getSource();
		oSrc.getParent().getParent().close();
		var container = this.getView().byId("container");
		if (container.getEditable()) {
			var popover = evt.getSource().getParent().getParent();
			var rearrangeBtn = popover.getContent()[0].getButtons()[0];
			rearrangeBtn.setText("Reordenar");
			rearrangeBtn.setIcon("sap-icon://edit");
			container.setEditable(false);
		}
		var bus = sap.ui.getCore().getEventBus();
		
		bus.publish("nav", "back");

	},

	handleOptionsPress : function (evt) {
		if (!this.popover) {
			this.popover = new sap.ui.xmlfragment(
					"com.sap.randon.optionsfragment.CustomerView",
					"com.sap.randon.frags.MainViewPopover", 
					this);
		}

		if (this.popover.isOpen()) {
			this.popover.close();
			return;
		}
		this.popover.openBy(evt.getSource());
		evt.getSource().addStyleClass("sapMBtnActive");
	},

	forceButtonActive : function (evt) {
		var button = this.getView().byId("optionsButton");
		button.addStyleClass("sapMBtnActive");
	},

	forceButtonInactive : function (evt) {
		var button = this.getView().byId("optionsButton");
		button.removeStyleClass("sapMBtnActive");
	},

	pendingTestsPress : function (evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "PendingTests",
			data : {
				context : null
			}
		});
	},
	
	newTestRequest : function (evt){
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "NewRequest",
			data : {
				context : null
			}
		});
	},
	
	customerInfo : function (evt){
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "CustomerInfo",
			data : {
				context : null
			}
		});
	},
	
	runningTestsPress : function (evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "RunningTests", 
			pageLocation : "com.sap.randon.view.customer.RunningTestsView",
			data : { context : null }
		});
	},

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf test1.MainView
	 */
	onInit : function () {
		
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf test1.MainView
	 */
	onBeforeRendering : function () {

	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf test1.MainView
	 */
	onAfterRendering : function () {

	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf test1.MainView
	 */
	onExit : function () {

	}

});