jQuery.sap.declare("com.sap.randon.Component");
jQuery.sap.require("com.sap.randon.util.RequestedTestsMockData");
sap.ui.core.UIComponent.extend("com.sap.randon.Component", {
	createContent : function() {
		var oView = new sap.ui.view({
			id : "appView",
			viewName : "com.sap.randon.view.App",
			type : "JS",
			viewData : {
				component : this
			}
		});

		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel, "i18n");

		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			isNoPhone : !jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});

		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");

		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(RequestedTestsMockData);
		oView.setModel(oModel);

		return oView;
	}
});