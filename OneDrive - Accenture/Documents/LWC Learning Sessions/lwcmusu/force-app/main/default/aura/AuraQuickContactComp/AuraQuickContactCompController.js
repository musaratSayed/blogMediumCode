({
	doInit: function(component, event, helper) {
		console.log('1. Inside Init Handler of Aura QUick Contact Controller:');

		var action = component.get('c.getAccountName');
		action.setParams({
			accId: component.get('v.recordId')
		});

		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === 'SUCCESS') {
				component.set('v.account', response.getReturnValue());
			} else {
				console.log('Error in retrieving account: ' + state);
			}
		});

		$A.enqueueAction(action);
	},

	handleSave: function(component, event, helper) {
		console.log('2. Inside Save button function of Aura QUick Contact');

		var saveAction = component.get('c.saveContact');
		saveAction.setParams({
			c: component.get('v.newContact'),
			accountId: component.get('v.recordId')
		});

		saveAction.setCallback(this, function(response) {
			var state = response.getState();
			if (state === 'SUCCESS') {
				console.log('Inside Success of Save Contact');
				var toastEvent = $A.get('e.force:showToast');
				toastEvent.setParams({
					title: 'Success',
					message: 'Contact Created Successfully via Aura'
				});
				toastEvent.fire();
				$A.get('e.force:closeQuickAction').fire();
				$A.get('e.force:refreshView').fire();
			} else if (state === 'ERROR') {
				console.log('Problem saving contact, response state: ' + state);
			} else {
				console.log('Unknown problem, response state: ' + state);
			}
		});

		$A.enqueueAction(saveAction);
	},
	handleCancel: function(component, event, helper) {
		console.log('3. Inside Cancel button function of Aura QUick COntact');
		//Closes the action panel by firing the force:closeQuickAction event.
		$A.get('e.force:closeQuickAction').fire();
	}
});
