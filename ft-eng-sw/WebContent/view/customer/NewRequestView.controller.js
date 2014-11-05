jQuery.sap.require("com.sap.randon.util.RequestedTestsMockData");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.m.MessageBox");
sap.ui.controller("com.sap.randon.view.customer.NewRequestView", {
	selectDialog : null, 
	selectedItem : null,
	selectedIconTabFilter : null,
	openTestsSelect : function (evt) {
		if (! this.selectDialog) {
			this.selectDialog = sap.ui.xmlfragment(
					"com.sap.randon.view.NewRequestView",
					"com.sap.randon.frags.SelectTestsDialog",
					this
			);

		}
		this.selectDialog.open();
	},
	
	onTestTypeSelected : function (evt) {
		this.selectedItem = evt.getParameters()["selectedItem"];
		this.getView().byId("testTypeSelector").setText(
				this.selectedItem.getCells()[0].getTitle()
		);
	},
	
	navigateHome : function (evt) {
		sap.ui.getCore().getEventBus()
			.publish("nav", "back");

		
	},

	nextStep : function(evt) {
		var iconTabBar = this.getView().byId("idIconTabBarMulti");
		var nextTab = evt.getSource().getCustomData().filter(function(item) {
			return item.getKey() === "nextTabNumber";
		})[0];


		iconTabBar.setSelectedKey(nextTab.getValue());

		if ("5" === nextTab.getValue()) {
			this.getView().byId("sendRequestButton").setEnabled(true);
		} else {
			this.getView().byId("sendRequestButton").setEnabled(false);
		}
	},	
	getFormData : function () {
		data = { };
		var newId;
		if (RequestedTestsMockData.pendingTests.length === 0) newId = 1;
		else {
		var lastTest = RequestedTestsMockData.pendingTests[RequestedTestsMockData.pendingTests.length - 1];
		newId = new String(1 + parseInt(lastTest["id"]));
		}
		data.id = newId;
		
		var view = this.getView();
		var controller = this;
		data.companyName = view.byId("clientName").getValue();
		data.creationDate = this.convertDate(new Date());
		data.status = "Pendente de Aprovação";
		data.requestorData = {
			name : view.byId("requestor").getValue(),
			cpf : view.byId("cpf").getValue(),
			telephone : view.byId("phone").getValue(),
			email : view.byId("email").getValue()
		};
		
		data.sampleData = {
			product : view.byId("product").getValue(),
			amount : view.byId("amount").getValue(),
			description : view.byId("description").getValue()
		};
		
		data.attachments = [];
		
		data.testData = {
			type : this.selectedItem.getCells()[0].getTitle(),
			startDate : controller.convertDate(view.byId("startDate").getDate()),
			endDate : controller.convertDate(view.byId("endDate").getDate()),
			reportType : view.byId("reportType").getSelectedItem().getText()
		};
		
		data.billingData = {
			billTo : view.byId("billTo").getValue(),
			clientCode : view.byId("clientCode").getValue(),
			cnpjOrCpf : view.byId("cnpjOrCpf").getValue(),
			addressForReceipt : view.byId("addressForReceipt").getValue(),
			billCity : view.byId("billingCity").getValue(),
			billCep : view.byId("billingCep").getValue()
		};
		
		data.progress = {
			testStatus : "Pendente de Aprovação"
		};
		
		return data;
	},
	
	submitRequest : function (evt) {
		data = this.getFormData();
		RequestedTestsMockData.pendingTests.push(data);
		sap.ui.getCore().getEventBus()
		 	.publish("model", "refresh");
		sap.ui.getCore().getEventBus()
			.publish("nav", "back");

		this.clearInputs(null, null, { controller : this });
		// TODO clear 5th tab
		// TODO disable the iconTabFilters
		sap.m.MessageToast.show("Solicitação enviada com sucesso!", {
			duration : 2000
		});
		var view = this.getView();
		var items = view.byId("idIconTabBarMulti").getItems();
		for (var item = 4; item < items.length; item += 2) {
			items[item].setEnabled(false);
		}
		view.byId("idIconTabBarMulti").setSelectedKey("1");
		view.byId("sendRequestButton").setEnabled(false);
	},
	
	
	// CALLEDBY cancelRequest
	// data.controller should point to this controller ALWAYS.
	clearInputs : function (channel, event, data) {
		jQuery.each(data.controller.inputs, function (i, input) {
			if (input.getEnabled()) input.setValue("");
		});
	},
	
	cancelRequest : function (evt) {
		var controller = this;
		sap.m.MessageBox.show(
			"Você quer mesmo descartar esta requisição?",
			sap.m.MessageBox.Icon.WARNING,
			"Confirme sua ação:",
			[sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
			function (oAction) { 
				if (oAction === sap.m.MessageBox.Action.YES) {
					sap.ui.getCore().getEventBus().publish("newrequest", "clearinputs", { controller : controller });
					sap.ui.getCore().getEventBus().publish("nav", "back");
					view = controller.getView();
					var items = view.byId("idIconTabBarMulti").getItems();
					for (var item = 4; item < items.length; item += 2) {
						items[item].setEnabled(false);
					}
					view.byId("idIconTabBarMulti").setSelectedKey("1");
					view.byId("sendRequestButton").setEnabled(false);
				}
			}
			);
		
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.NewSolicitationView
*/
	onInit: function() {

		var isPhone = jQuery.device.is.phone;
		var view = this.getView();
		var testDateBox = view.byId("testDateBox");
//		if (isPhone) {
//			testDateBox.setDirection(sap.m.FlexDirection.Column);
//			testDateBox.setAlignItems(sap.m.FlexAlignItems.Stretch);
//		} else {
//			testDateBox.setDirection(sap.m.FlexDirection.Row);
//			testDateBox.setAlignItems(sap.m.FlexAlignItems.Center);
//		}
		var model = new sap.ui.model.json.JSONModel();
		model.setData(RequestedTestsMockData);
		this.getView().setModel(model);
		// TODO Guardar os inputs em this.inputs pra poder limpar todos de uma vez!
		//this.getView().byId("reportType").setSelectedItemId("reportType-default");
		
		this.inputs = [
            view.byId("clientName"),
            view.byId("requestor"),
            view.byId("cpf"),
            view.byId("phone"),
            view.byId("email"),
            view.byId("product"),
            view.byId("amount"),
            view.byId("description"),
            view.byId("startDate"),
            view.byId("endDate"),
            view.byId("billTo"),
            view.byId("clientCode"),
            view.byId("cnpjOrCpf"),
            view.byId("addressForReceipt"),
            view.byId("billingCity"),
            view.byId("billingCep")
        ];
		
		sap.ui.getCore().getEventBus().subscribe("newrequest", "clearinputs", this.clearInputs, this);
		
		var iconTabBar = view.byId("idIconTabBarMulti");
		var iconTabItems = iconTabBar.getItems();
		iconTabItems[2].setEnabled(true);
	},
	convertDate : function (inputFormat) {
		function pad(s) {
			return (s < 10) ? '0' + s : s;
		}
		var d = new Date(inputFormat);
		return [ pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear() ]
				.join('/');
	},
	
	
	sendAllToCheckout : function() {

		var view = this.getView();

		view.byId("checkoutClientName").setText(this.getView().byId("clientName").getValue());
		// Commented while ClientName is not bound
		view.byId("checkoutRequestor").setText(
				view.byId("requestor").getValue());
		view.byId("checkoutCpf").setText(view.byId("cpf").getValue());
		view.byId("checkoutPhone").setText(view.byId("phone").getValue());
		view.byId("checkoutEmail").setText(view.byId("email").getValue());
		view.byId("checkoutProduct").setText(view.byId("product").getValue());
		view.byId("checkoutAmount").setText(view.byId("amount").getValue());
		view.byId("checkoutDescription").setText(
				view.byId("description").getValue());

		// Converts date do dd/mm/yyyy
		var startDate = view.byId("startDate").getDate();
		startDate = this.convertDate(startDate);
		var endDate = view.byId("endDate").getDate();
		endDate = this.convertDate(endDate);

		view.byId("checkoutStartDate").setText(startDate);
		view.byId("checkoutEndDate").setText(endDate);

		
		view.byId("checkoutTestType").setText(this.selectedItem.getCells()[0].getTitle());
		view.byId("checkoutReportType").setText(
				view.byId("reportType").getSelectedItem() != null ?
						view.byId("reportType").getSelectedItem().getText() 
						: "Padrão Campo de Provas");
		
		view.byId("checkoutBillTo").setText(view.byId("billTo").getValue());
		view.byId("checkoutClientCode").setText(view.byId("clientCode").getValue());
		view.byId("checkoutCnpjOrCpf").setText(view.byId("cnpjOrCpf").getValue());
		view.byId("checkoutAddressForReceipt").setText(view.byId("addressForReceipt").getValue());
		view.byId("checkoutBillingCity").setText(view.byId("billingCity").getValue());
		view.byId("checkoutBillingCep").setText(view.byId("billingCep").getValue());

	

	},
	
	validatePreviousForm : function (evt) {
		const NOT_FOUND = -1;
		const OFFSET_TABFILTER = 2;
		var iconTabBar = evt.getSource();
		var newSelectedItem = evt.getParameters()["item"];
		
		var indexToValidate = iconTabBar.indexOfItem(newSelectedItem) 
								- OFFSET_TABFILTER;
		if (indexToValidate < 0)
			return;
		var validate = iconTabBar.getItems()[indexToValidate];

		var validationSucceeded = true;
		function spreadValidation (i, input) {
			// The Algorithm is a DFS in the tree of the view's components, trying to find
			// the ones from which we can get values.
			
			if (input.getContent) { 
				jQuery.each(input.getContent(), spreadValidation);
			} else if (input.getItems) {
				jQuery.each(input.getItems(), spreadValidation);
			} else if (input.getDate) {
				if (input.getDate() == null) {
					validationSucceeded = false;
					if (input.setValueState != null) input.setValueState(sap.ui.core.ValueState.Error);
				} else {
					if (input.setValueState != null) input.setValueState(sap.ui.core.ValueState.None);
				}
			
			} else if (input.getValue) {
				if (input.getValue() === "") {
					validationSucceeded = false;
					if (input.setValueState != null) input.setValueState(sap.ui.core.ValueState.Error);
				} else {
					if (input.setValueState != null) input.setValueState(sap.ui.core.ValueState.None);
				}
			}
		}
		jQuery.each(validate.getContent(), spreadValidation);
		if ("2" === validate.getKey()) {
			if (this.selectedItem == null) {
				this.getView().byId("testTypeSelector").setType(sap.m.ButtonType.Reject);
				validationSucceeded = false;
			} else {
				this.getView().byId("testTypeSelector").setType(sap.m.ButtonType.Default);
			};
			
		}
		
		if (! validationSucceeded) {
			evt.cancelBubble();
			iconTabBar.setSelectedKey((indexToValidate/OFFSET_TABFILTER + 1).toString());
			sap.m.MessageToast.show("Por favor, preencha todos os campos.");
		};
		
		return validationSucceeded;
	},
	handleSelectedIconChange : function(evt) {
		var params = evt.getParameters();
		var oSendBtn = this.getView().byId("sendRequestButton");
		
		if (params.key !== "5" && oSendBtn.getEnabled()) {
			oSendBtn.setEnabled(false);
		}
		
		if (this.validatePreviousForm(evt)) {
		
			if ("5" === params.key ) {
				
				oSendBtn.setEnabled(true);
				this.sendAllToCheckout();
	
			} else {
				oSendBtn.setEnabled(false);
				this.getView().byId("idIconTabBarMulti").getItems()[parseInt(params.key) * 2]
					.setEnabled(true);
			}
		}
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf view.NewSolicitationView
	 */
	onBeforeRendering : function() {
		this.getView().byId("idIconTabBarMulti").setSelectedKey("1");
		this.selectedIconTabFilter = "1";
	}

/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf view.NewSolicitationView
 */
// onAfterRendering: function() {
//
//	}

/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf view.NewSolicitationView
 */
// onExit: function() {
//
// }
});