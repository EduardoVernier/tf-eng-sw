sap.ui.jsview("com.sap.randon.view.App", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf test1.App
	*/ 
	getControllerName : function () {
		return "com.sap.randon.view.App";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf test1.App
	*/ 
	createContent : function (oController) {
	
 		this.setDisplayBlock(true);
 		
 		this.app = new sap.m.App("theApp");

 		var login = new sap.ui.xmlview ("Login", "com.sap.randon.view.LoginView");		
 		this.app.addPage(login, true);
 		
 		         
        var customerMain = new sap.ui.xmlview("CustomerView", "com.sap.randon.view.customer.MainView");
        this.app.addPage(customerMain, false);
 			
        var admMain = new sap.ui.xmlview("AdmView", "com.sap.randon.view.adm.MainView");
        this.app.addPage(admMain, false);
        
        var operatorMain = new sap.ui.xmlview("OperatorView", "com.sap.randon.view.operator.MainView");
        this.app.addPage(operatorMain, false);
 		
 		var requestedTests = new sap.ui.xmlview("PendingTests", 
												"com.sap.randon.view.customer.PendingTestsView");
 		//requestedTests.getController().nav = this.getController();
 		this.app.addPage(requestedTests,false);

 		var admRequestedTests = new sap.ui.xmlview("AdmPendingTests",
 				"com.sap.randon.view.adm.PendingTestsView");
 		this.app.addPage(admRequestedTests, false);
 		
 		var register = new sap.ui.xmlview("RegisterView", "com.sap.randon.view.RegisterView");
 		this.app.addPage(register, false);
 		
 		var newSolicitation = new sap.ui.xmlview("NewRequest", "com.sap.randon.view.customer.NewRequestView");
 		this.app.addPage (newSolicitation,false);
 		
 		var customerInfo = new sap.ui.xmlview("CustomerInfo","com.sap.randon.view.customer.CustomerInfo");
 		this.app.addPage (customerInfo,false);
 		
 		var hoursControl = new sap.ui.xmlview("HoursControl","com.sap.randon.view.adm.HoursControlView");
 		this.app.addPage (hoursControl,false);
 		
// 		var pendingTestDetail = new sap.ui.xmlview("PendingTestDetail", "com.sap.randon.view.PendingTestsDetailView");
// 		this.app.addPage (pendingTestDetail,false);

 		
 		return this.app;
	}

});