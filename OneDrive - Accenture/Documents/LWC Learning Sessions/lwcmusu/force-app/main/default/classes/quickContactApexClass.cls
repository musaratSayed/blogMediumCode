public with sharing class quickContactApexClass{
	@AuraEnabled(cacheable = true)
	public static Account getAccountName(Id accId){
		return [Select Name, BillingCity, BillingState
		        from Account
		        where Id = :accId];
	}

	@AuraEnabled
	public static Contact saveContact(Contact c, Id accountId){
		c.accountId = accountId;
		upsert c;
		return c;
	}
}