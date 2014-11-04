sap.ui.controller("com.sap.randon.view.App", {
	navToHandler : function (channelId, eventId, data) {
		if (! this.app.getPage(data.id) && data.pageLocation) {
			this.app.addPage(new sap.ui.xmlview(data.id, data.pageLocation), false);
		}
		
		this.app.to(data.id, data.data.context);
		
		if (data.data.context) {
			var page = this.app.getPage(data.id);
			page.setBindingContext(data.data.context);
		}
	},
	
	navBackHandler : function () {
		this.app.back();
	},
	
	navHomeHandler : function () {
		// TODO find a way to go home .
	},
	addPageHandler : function (channelId, eventId, data) {
		this.getView().app.addPage(data.page, false);
	},
	
	removePageHandler : function (channelId, eventId, data) {
		alert(this.getView().app.removePage(data.page));
	},
	
	modelRefreshHandler : function () {
		this.getView().getModel().refresh(true);
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf test1.App
*/
	onInit: function () {
		var view = this.getView();
		this.app = view.app;
		
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("nav", "to", this.navToHandler, this);
		bus.subscribe("nav", "back", this.navBackHandler, this);
		// bus.subscribe("nav", "home", this.navHomeHandler, this);
		bus.subscribe("model", "refresh", this.modelRefreshHandler, this);
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf test1.App
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf test1.App
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf test1.App
*/
//	onExit: function() {
//
//	}

});