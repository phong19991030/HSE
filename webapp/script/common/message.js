/**
 * @parkjk
 * : WT 플랫폼 공통 메세지 
 * alert 등등 
 */
const _MESSAGE = {
	common : {
		saveSuccess: 'Save succeeded.',
		saveFail: 'Save failed.',
		deleteConfirm: 'Do you want to delete?\nIf you delete, you can\'t go back.',
		deleteSuccess: 'Delete succeeded.',
		deleteFail: 'Delete failed.',
		timeError: 'Time error!',
		duplicateCheckRequest: function(msg='name') {
			return `Please duplicate check the ${msg}.`
		},
		duplicateCheckFail: function(msg='name') {
			return `This is a duplicate ${msg}.`
		},
		duplicateCheckSuccess: function(msg='name') {
			return `This is an available ${msg}.`
		},
		avilable: 'Available',
		unacceptableFileExtension: 'This is unacceptable file extension.',
		selectItem: function(msg='item') {
			var article = 'a';
			if(['a', 'e', 'i', 'o', 'u'].includes(msg.toLowerCase().charAt(0))) article = 'an'; 
			return `Please select ${article} ${msg}.`
		},
		// SQL 무결성 제약 조건 위반 예외
		SQLIntegrityConstraintViolationException: 'Please delete the sub-reference data first.',
		noPermission: 'Don\'t have permission.',
	},
	cms: {
		alreadyModel: 'This model has already been added.'
	},
	oam: {
		deleteWorkAlert:'At least one Work is required.',
		deleteFlightAlert:'At least one Flight time is required.',
		noWorker: 'At least one Worker is required.',
		planConfirm: 'Do you want to confirm?\nIf you confirm, you can\'t go back.',
		planConfirmSuccess: 'Confirm succeeded.',
		planConfirmFail: 'Confirm failed.',
		eventAlertOfStatus1: 'Please register a plan.',
		eventAlertOfStatus2: 'Please confirm a plan.',
		eventCompleteConfirm: 'Do you want to complete this event?\nIf you complete it, you can\'t go back.',
		eventCompleteSuccess: 'Event completed succeeded.',
		eventCompleteFail: 'Event completed failed.',
		bladeSpecRequireSpec: 'There are items that you have not entered.',
		bladeSpecSaveConfirm: 'Do you want to save the blade specification?\nIf you save it, you can\'t go back.',
		// 
		alertSelectTurbineModel: 'Please select a turbine model.',
		alertSaveBladeSpec: 'Please save the blade spec.',
		alertSaveDroneSpec: 'Please save the drone spec.',
		alertRegisterBladeDamage: 'Please register a damage list.',
	},
	sys: {
		idDuplicateCheckFail: 'This is a duplicate ID.',
		idDuplicateCheckSuccess: 'This is an available ID.',
		twoPassWordCheckFail: 'It is different from the password above.',
		twoPassWordCheckSuccess: 'The two passwords are match.',	
		activeMenuConfirm: 'Do you want change it?',
		
		farmRadiusMore: 'Farm radius cannot exceed 2km.',
		farmRadiusLess: 'Farm radius must be at least 300m.',
		turbineOutOfRange: 'Please let Turbine fall within the range of Farm.',
		latMaximum: 'The maximum latitude value is 90.',
		latMinimum: 'The minimum latitude value is -90.',    
		lngMaximum: 'The maximum longitude value is 180.',
		lngMinimum: 'The minimum longitude value is -180.',
	},
};