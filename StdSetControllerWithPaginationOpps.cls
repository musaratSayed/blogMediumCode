public with sharing class StdSetControllerWithPaginationOpps
 {

    public Integer getTotalPages() {
        Integer resultSize=this.objController.getResultSize();
        Integer pgSize=this.objController.getPageSize();
        Integer totPages = (resultSize/pgSize) + (Math.mod(resultSize,pgSize));
        return totPages;
    }

    private static final Integer PAGE_SIZE = 5;
    public ApexPages.StandardSetController objController{
    
    get{
     if(objController==null)
     {
         List<Opportunity> opsList = [Select Name,CloseDate,Amount,Account.Name from Opportunity];
         this.objController = new ApexPages.StandardSetController(opsList);
         this.objController.setPageSize(PAGE_SIZE);
     }
    return objController;
    } 
    set; 
    }
    
    public List<Opportunity> getOpportunities() {
        return (List<Opportunity>)this.objController.getRecords();
    }
    
    

 
}