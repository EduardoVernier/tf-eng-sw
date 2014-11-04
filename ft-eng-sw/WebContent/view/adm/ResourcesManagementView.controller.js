jQuery.sap.require("com.sap.randon.util.Formatter");
jQuery.sap.require("com.sap.randon.util.RequestedTestsMockData");

sap.ui.controller("com.sap.randon.view.adm.ResourcesManagementView", {
	addTrackDialog : null,

	handleNavButtonPress : function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	},

	onAddTrackConfirm : function (evt) {
		var selectedItems = evt.getParameters().selectedItems;
		if (selectedItems.length != 0) {
			for (var i = 0; i < selectedItems.length; i++) {
				var item = selectedItems[i];
				var cells = item.getCells();
				var convertedItem = {
						name : cells[0].getTitle(),
						id : cells[1].getText(),
						isAvailable : ("Disponível" === cells[2].getText())
				};
				// Doesn't handle duplicates.
				RequestedTestsMockData.tracks.push(convertedItem);
				sap.ui.getCore().getEventBus().publish("model", "refresh");
			}
		}
	},
	
	onAddHumanConfirm : function (evt) {
		var selectedItems = evt.getParameters().selectedItems;
		if (selectedItems.length != 0) {
			for (var i = 0; i < selectedItems.length; i++) {
				var item = selectedItems[i];
				var cells = item.getCells();
				var convertedItem = {
						name : cells[0].getTitle(),
						id : cells[1].getText(),
						isAvailable : ("Disponível" === cells[2].getText())
				};
				// Doesn't handle duplicates.
				RequestedTestsMockData.people.push(convertedItem);
				sap.ui.getCore().getEventBus().publish("model", "refresh");
			}
		}
	},
	
	onAddEquipmentConfirm : function (evt) {
		var selectedItems = evt.getParameters().selectedItems;
		if (selectedItems.length != 0) {
			for (var i = 0; i < selectedItems.length; i++) {
				var item = selectedItems[i];
				var cells = item.getCells();
				var convertedItem = {
						name : cells[0].getTitle(),
						id : cells[1].getText(),
						isAvailable : ("Disponível" === cells[2].getText())
				};
				// Doesn't handle duplicates.
				RequestedTestsMockData.equipments.push(convertedItem);
				sap.ui.getCore().getEventBus().publish("model", "refresh");
			}
		}
	},
	handleAddTrack : function(evt) {
		if (!this.addTrackDialog) {
			this.addTrackDialog = sap.ui.xmlfragment(
					"com.sap.randon.view.ResourceManagementView",
					"com.sap.randon.frags.AddTrackDialog", this);
		}
		this.addTrackDialog.open();
	},

	handleAddHuman : function(evt) {
		if (!this.addHumanDialog) {
			this.addHumanDialog = sap.ui.xmlfragment(
					"com.sap.randon.view.ResourceManagementView",
					"com.sap.randon.frags.AddHumanDialog", this);
		}
		this.addHumanDialog.open();
	},

	handleAddEquipment : function(evt) {
		if (!this.addEquipmentDialog) {
			this.addEquipmentDialog = sap.ui.xmlfragment(
					"com.sap.randon.view.ResourceManagementView",
					"com.sap.randon.frags.AddEquipmentDialog", this);
		}
		this.addEquipmentDialog.open();
	}

/**
 * Called when a controller is instantiated and its View controls (if available)
 * are already created. Can be used to modify the View before it is displayed,
 * to bind event handlers and do other one-time initialization.
 * 
 * @memberOf view.adm.ResourcesManagementView
 */
// onInit: function() {
//
// },
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf view.adm.ResourcesManagementView
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf view.adm.ResourcesManagementView
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf view.adm.ResourcesManagementView
 */
// onExit: function() {
//
// }
});