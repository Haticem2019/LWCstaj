public class OpportunityTriggerHandler {
    public static void OppClosedWonTask(List<Opportunity> newOpportunities, Map<Id, Opportunity> oldOpportunities){
     List<Task> followUpTasks = new List<Task>();
        for (Opportunity opp : newOpportunities) {
            // Check if the Opportunity stage is updated to 'Closed Won'
            if (opp.StageName == 'Closed Won' && oldOpportunities.get(opp.Id).StageName != 'Closed Won') {
                // Create a follow-up Task
                Task followUpTask = new Task(
                    Subject = 'Follow up Task',
                   	ActivityDate = opp.CloseDate.addMonths(1),
                    WhatId = opp.Id, // Link the Task to the Opportunity
                    OwnerId = opp.OwnerId
                );
                followUpTasks.add(followUpTask);
            }
        }
        if (!followUpTasks.isEmpty()) {
            insert followUpTasks;
        }
    }
}