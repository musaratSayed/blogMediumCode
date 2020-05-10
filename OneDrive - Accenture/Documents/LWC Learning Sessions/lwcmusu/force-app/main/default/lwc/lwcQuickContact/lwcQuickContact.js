import { LightningElement, api, wire, track } from 'lwc';
import getAccountName from '@salesforce/apex/quickContactApexClass.getAccountName';
import saveContact from '@salesforce/apex/quickContactApexClass.saveContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class LwcQuickContact extends NavigationMixin(LightningElement) {
	@api recordId;
	lname;
	email;
	phone;
	@track error;

	@wire(getAccountName, { accId: '$recordId' })
	acct;

	get acctReceieved() {
		console.log('Inside get');
		console.log('recordId: ', this.recordId);
		console.log('Object acc: ', this.acct.data);
		if (this.acct.data) {
			return true;
		} else {
			console.log('insidefalse');
			return false;
		}
	}

	handleLNameChange(event) {
		console.log('inside handleLasname', event.target.value);
		//this.contactRecord.LastName=event.target.value;
		this.lname = event.target.value;
	}

	handleInputChange(event) {
		const eventName = event.target.name;
		//	console.log('inside input change');
		console.log('Now in:', eventName);
		if (event.target.dataset.id === 'lastname1') {
			this.lname = event.target.value;
			console.log('--lname-----', this.lname);
		}

		if (event.target.name === 'phone') {
			this.phone = event.target.value;
			console.log('--phone--', this.phone);
		}
		if (event.target.name === 'email') {
			this.email = event.target.value;
			console.log('---email---', this.email);
		}
	}

	handleSave(event) {
		console.log('Inside handle save');

		console.log('Acc Id: ', this.acct.data.Id);

		let contactRecord = {
			sobjectType: 'Contact',
			LastName: this.lname,
			Email: this.email,
			Phone: this.phone
		};
		console.log('objectCheck:::', contactRecord);
		console.log(JSON.stringify(contactRecord));

		saveContact({ c: contactRecord, accountId: this.acct.data.Id })
			.then((result) => {
				//this.contactRecord = result;
				console.log('result is: ', result);
				const successToast = new ShowToastEvent({
					title: 'Sucess',
					message: 'Contact Created',
					variant: 'Success'
				});
				this.dispatchEvent(successToast);
				this[NavigationMixin.Navigate]({
					type: 'standard__recordPage',
					attributes: {
						recordId: this.recordId,
						objectApiName: 'Account',
						actionName: 'view'
					}
				});
			})
			.catch((error) => {
				this.error = error;
				console.log('in error', error.body.message);
			});
	}

	handleCancel() {
		console.log('Inside handleCancel of JS');
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: this.recordId,
				objectApiName: 'Account',
				actionName: 'view'
			}
		});
	}
}
