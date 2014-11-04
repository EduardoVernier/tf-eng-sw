jQuery.sap.declare("com.sap.randon.util.RequestedTestsMockData");

RequestedTestsMockData = {
	UserTitle : "Scania	Latin America Ltda.",
	PendingTestsNumber : "3",
	RunningTestsNumber : "9",
	FinishedTestsNumber : "3",
	CheckoutNumber : "1",
	TestsScheduleNumber : "3",
	PendingReportsNumber : "5",
	BillingPending : "1",
	StatisticsNumber : "3",
	TestsInPreparationNumber : "4",
	pendingTests : [ {
		id : "1",
		companyName : "Scania",
		creationDate : "07/02/2014",
		status : "Pendente de Aprovação",
		requestorData : {
			name : "Enderson Pereira",
			cpf : "99569450568",
			telephone : "(051) 9996 0000",
			email : "enderson@scania.com"
		},
		sampleData : {
			product : "Pastilhas de Freio",
			amount : "100",
			description : "-"
		},
		attachments : [],
		testData : {
			type : "Teste de Frenagem",
			startDate : "27/02/2014",
			endDate : "06/03/2014",
			reportType : "Padrão Campo de Provas"
		},
		billingData : {
			billTo : "Scania Latin America Ltda.",
			clientCode : "4325590857345",
			cnpjOrCpf : "59.104.901/0001-76",
			addressForReceipt : "Av. José Odorizzi, 151, Bairro Vila Euro",
			billCity : "São Bernardo dos Campos",
			billCep : "91340-110"
		},
		progress : {
			testStatus : "Pendente de Aprovação"
		}
	}, {
		id : "2",
		companyName : "Scania",
		creationDate : "02/07/2014",
		status : "Pendente de Aprovação",
		requestorData : {
			name : "Anderson Pereira",
			cpf : "12345678910",
			telephone : "(051) 7839 0000",
			email : "anderson@scania.com"
		},
		sampleData : {
			product : "Pastilhas de Freio",
			amount : "100",
			description : "-"
		},
		attachments : [],
		testData : {
			type : "Teste de Frenagem",
			startDate : "27/02/2014",
			endDate : "06/03/2014",
			reportType : "Padrão Campo de Provas"
		},
		billingData : {
			billTo : "Scania Latin America Ltda.",
			clientCode : "4325590857345",
			cnpjOrCpf : "59.104.901/0001-76",
			addressForReceipt : "Av. José Odorizzi, 151, Bairro Vila Euro",
			billCity : "São Bernardo dos Campos",
			billCep : "91340-110"
		},
		progress : {
			testStatus : "Pendente de Aprovação"
		}
	} ],
	runningTests : [ ],
	finishedTests : [ ], 
	tracks : [
      { 
    	  name : "Pista de Alta Velocidade",
    	  id : "P211103",
    	  isAvailable : false
	  }, {
		  name : "Rampa de Asfalto (-5%)",
		  id : "P211104",
		  isAvailable : false
	  }, {
		  name : "Rampa de Asfalto (-12%)",
		  id : "P211105",
		  isAvailable : true
	  }, {
		  name : "Rampa de Asfalto (-18%)",
		  id : "P211106",
		  isAvailable : true
	  }, {
		  name : "Rampa de Asfalto (-20%)",
		  id : "P211107",
		  isAvailable : false
	  }
      
    ],
	people : [
      {
    	  name : "Adaílton de Souza",
    	  id : "P211113",
    	  isAvailable : false
      }, {
    	  name : "Dário Pedroso",
    	  id : "P211114",
    	  isAvailable : false
      }, {
    	  name : "Emerson Freitas",
    	  id : "P211115",
    	  isAvailable : true
      }, {
    	  name : "Júlio Batista da Silva",
    	  id : "P211116",
    	  isAvailable : true
      }
    ],
	equipments : [
      {
    	  name : "Sensor de Telemetria 1",
    	  id : "P211123",
    	  isAvailable : false
      },
      {
    	  name : "Sensor de Telemetria 2",
    	  id : "P211124",
    	  isAvailable : false
      }
    ]
};