sap.ui.controller("com.sap.randon.view.RegisterView", {
	handleNavButtonPress : function (evt) {
	
		var filtered = this.inputs.filter(function (element, index, array) {
			return element.getValue() !== "";
		});
		if (filtered.length === 0) {
			this.resetInputs();
		}
		
		sap.ui.getCore().getEventBus()
			.publish("nav", "back");
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.RegisterView
*/
	onInit: function () {
		this.oFormLayout = new sap.ui.layout.form.ResponsiveGridLayout();

		sap.ui.getCore().attachValidationError(function (evt) {
			var control = evt.getParameter("element");
			if (control && control.setValueState) {
				control.setValueState("Error");
			};
		});
		
		sap.ui.getCore().attachValidationSuccess(function (evt) {
			var control = evt.getParameter("element");
			if (control && control.setValueState) {
				control.setValueState("None");
			}
		});
		
		var view = this.getView();

		this.inputs = [
		              view.byId("companyName"),
		              view.byId("sector"),
		              view.byId("cnpj"),
		              view.byId("category"),
		              view.byId("address"),
		              view.byId("city"),
		              view.byId("cep"),
		              view.byId("telephone")
		          ];
		  	
	},
	resetInputs : function () {
		jQuery.each(this.inputs, function (i, input) {
			input.setValue("");
			input.setValueState("None");
		});
	},
	submit : function (data) {
		alert("Submitted!");
		this.resetInputs();
	},
	
	validate : function () {
		
		
		jQuery.each(this.inputs, function (i, input) {
			if (! input.getValue()) {
				input.setValueState("Error");
			} else {
				input.setValueState("None");
			}
		});
		
		var canContinue = true;
		
		jQuery.each(this.inputs, function (i, input) {
			if ("Error" === input.getValueState()) {
				canContinue = false;
				return false;
			}
		});
		
		if (canContinue) {
			data = { };
			jQuery.each(this.inputs, function (i, input) {
				data[input.getId()] = input.getValue();
			});
			this.submit(data);
		} else {
			jQuery.sap.require("sap.m.MessageToast");
			sap.m.MessageToast.show("Os campos destacados são obrigatórios.");
		}
	},
	
	validateAndSubmit : function (evt) {
		this.validate();	
	},
	
	onlyNumbers : sap.ui.model.SimpleType.extend("com.sap.randon.RegisterView.onlyNumbers", {
		formatValue : function (oValue) {
			return oValue;
		},
		
		parseValue : function (oValue) {
			return oValue;
		},
		
		validateValue : function (oValue) {
			var onlyNumbersRegex = /^\d+$/;
			if (!oValue.match(onlyNumbersRegex)) {
				throw new sap.ui.model.ValidateException("Field must contain only numbers");
			}
		}
	})
	

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.RegisterView
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.RegisterView
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.RegisterView
*/
//	onExit: function() {
//
//	}

});