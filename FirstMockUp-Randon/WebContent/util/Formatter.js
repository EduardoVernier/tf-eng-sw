jQuery.sap.declare("com.sap.randon.util.Formatter");

com.sap.randon.util.Formatter = {
	getLength : function (oCollection) {
		return oCollection.length.toString();
	},
	
	isAvailableFormatter : function (bIsAvailable) {
		return bIsAvailable ? "Disponível" : "Ocupado";
	}
};