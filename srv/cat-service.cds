using { EnterprisePSA.db as db } from '../db/schema';

service CatalogService {

    /* ==========================
       DEPARTMENTS
       ========================== */

    entity DepartmentSRV as projection on db.Departments;

    action createDepartment(
        departmentName : String,
        description    : String
    ) returns DepartmentSRV;

    action updateDepartment(
        ID             : UUID,
        departmentName : String,
        description    : String
    ) returns DepartmentSRV;

    action deleteDepartment(
        ID : UUID
    ) returns String;


    /* ==========================
       EMPLOYEES
       ========================== */

    entity Employees as projection on db.Employees;

    action createEmployee(
        firstName    : String,
        lastName     : String,
        email        : String,
        jobTitle     : String,
        joinDate     : Date,
        hourlyRate   : Decimal(15,2),
        status       : String,
        departmentID : UUID
    ) returns Employees;

    action updateEmployee(
        ID           : UUID,
        firstName    : String,
        lastName     : String,
        email        : String,
        jobTitle     : String,
        hourlyRate   : Decimal(15,2),
        status       : String
    ) returns Employees;

    action deleteEmployee(
        ID : UUID
    ) returns String;


    /* ==========================
       MANAGERS
       ========================== */

    entity Managers as projection on db.Managers;

    action createManager(
        employeeID   : UUID,
        departmentID : UUID,
        managerLevel : String,
        status       : String
    ) returns Managers;

    action updateManager(
        ID           : UUID,
        managerLevel : String,
        status       : String
    ) returns Managers;

    action deleteManager(
        ID : UUID
    ) returns String;


    /* ==========================
       CLIENTS
       ========================== */

    entity Clients as projection on db.Clients;

    action createClient(
        clientName    : String,
        contactPerson : String,
        email         : String,
        phoneNumber   : String,
        country       : String,
        industry      : String,
        status        : String
    ) returns Clients;

    action updateClient(
        ID            : UUID,
        clientName    : String,
        contactPerson : String,
        email         : String,
        phoneNumber   : String,
        country       : String,
        industry      : String,
        status        : String
    ) returns Clients;

    action deleteClient(
        ID : UUID
    ) returns String;


    /* ==========================
       PROJECTS
       ========================== */

    entity Projects as projection on db.Projects
actions {

    action recalculateBudget();

    action generateInvoice();

};

    action createProject(
        projectCode   : String,
        projectName   : String,
        status        : String,
        billingType   : String,
        startDate     : Date,
        endDate       : Date,
        plannedHours  : Decimal(10,2),
        consumedHours : Decimal(10,2),
        clientID      : UUID,
        managerID     : UUID
    ) returns Projects;

    action updateProject(
        ID            : UUID,
        projectName   : String,
        status        : String,
        billingType   : String,
        startDate     : Date,
        endDate       : Date,
        plannedHours  : Decimal(10,2),
        consumedHours : Decimal(10,2)
    ) returns Projects;

    action deleteProject(
        ID : UUID
    ) returns String;


    /* ==========================
       BUDGETS
       ========================== */

    entity Budgets as projection on db.Budgets;

    action createBudget(
        projectID       : UUID,
        budgetAmount    : Decimal(15,2),
        consumedAmount  : Decimal(15,2),
        remainingAmount : Decimal(15,2),
        billingRateHr   : Decimal(15,2),
        currencyCode    : String,
        budgetStatus    : String
    ) returns Budgets;

    action updateBudget(
        ID              : UUID,
        budgetAmount    : Decimal(15,2),
        consumedAmount  : Decimal(15,2),
        remainingAmount : Decimal(15,2),
        billingRateHr   : Decimal(15,2),
        budgetStatus    : String
    ) returns Budgets;

    action deleteBudget(
        ID : UUID
    ) returns String;


    /* ==========================
       MILESTONES
       ========================== */

    entity Milestones as projection on db.Milestones;

    action createMilestone(
        projectID         : UUID,
        milestoneName     : String,
        startDate         : Date,
        endDate           : Date,
        completionPercent : Decimal(5,2),
        status            : String
    ) returns Milestones;

    action updateMilestone(
        ID                : UUID,
        milestoneName     : String,
        startDate         : Date,
        endDate           : Date,
        completionPercent : Decimal(5,2),
        status            : String
    ) returns Milestones;

    action deleteMilestone(
        ID : UUID
    ) returns String;


    /* ==========================
       TASKS
       ========================== */

    entity Tasks as projection on db.Tasks;

    action createTask(
        milestoneID    : UUID,
        taskName       : String,
        startDate      : Date,
        endDate        : Date,
        status         : String,
        estimatedHours : Decimal(10,2),
        actualHours    : Decimal(10,2)
    ) returns Tasks;

    action updateTask(
        ID             : UUID,
        taskName       : String,
        startDate      : Date,
        endDate        : Date,
        status         : String,
        estimatedHours : Decimal(10,2),
        actualHours    : Decimal(10,2)
    ) returns Tasks;

    action deleteTask(
        ID : UUID
    ) returns String;


    /* ==========================
       TIMESHEETS
       ========================== */

    entity Timesheets as projection on db.Timesheets
actions {

    action  submitTimesheet();

    action approveTimesheet();

    action rejectTimesheet(
        reason : String(255)
    );

};

    action createTimesheet(
        employeeID         : UUID,
        approvedByID       : UUID,
        invoiceID          : UUID,
        weekStartDate      : Date,
        weekEndDate        : Date,
        totalBillableHours : Decimal(10,2),
        submittedDate      : Date,
        approvedDate       : Date,
        status             : String
    ) returns Timesheets;

    action updateTimesheet(
        ID                 : UUID,
        approvedByID       : UUID,
        invoiceID          : UUID,
        totalBillableHours : Decimal(10,2),
        submittedDate      : Date,
        approvedDate       : Date,
        status             : String
    ) returns Timesheets;

    action deleteTimesheet(
        ID : UUID
    ) returns String;

    // action submitTimesheet(
    //     ID : UUID
    // ) returns Timesheets;

    // action approveTimesheet(
    //     ID : UUID
    // ) returns Timesheets;

    // action rejectTimesheet(
    //     ID     : UUID,
    //     reason : String(255)
    // ) returns Timesheets;


    /* ==========================
       TIMESHEET ENTRIES
       ========================== */

    entity TimesheetEntries as projection on db.TimesheetEntries;

    action createTimesheetEntry(
        timesheetID : UUID,
        taskID      : UUID,
        workDate    : Date,
        hours       : Decimal(4,2),
        billable    : Boolean
    ) returns TimesheetEntries;

    action updateTimesheetEntry(
        ID       : UUID,
        workDate : Date,
        hours    : Decimal(4,2),
        billable : Boolean
    ) returns TimesheetEntries;

    action deleteTimesheetEntry(
        ID : UUID
    ) returns String;


    /* ==========================
       INVOICES
       ========================== */

    entity Invoices as projection on db.Invoices
actions {

    action issue();

    action markPaid();

};

    action createInvoice(
        invoiceNumber : String,
        projectID     : UUID,
        clientID      : UUID,
        invoiceDate   : Date,
        dueDate       : Date,
        billableHours : Decimal(10,2),
        totalAmount   : Decimal(15,2),
        taxAmount     : Decimal(15,2),
        currencyCode  : String,
        paymentStatus : String,
        status        : String
    ) returns Invoices;

    action updateInvoice(
        ID            : UUID,
        invoiceDate   : Date,
        dueDate       : Date,
        billableHours : Decimal(10,2),
        totalAmount   : Decimal(15,2),
        taxAmount     : Decimal(15,2),
        paymentStatus : String,
        status        : String
    ) returns Invoices;

    action deleteInvoice(
        ID : UUID
    ) returns String;

    // action issueInvoice(
    //     ID : UUID
    // ) returns Invoices;

    // action markInvoicePaid(
    //     ID          : UUID,
    //     paymentDate : Date
    // ) returns Invoices;


    /* ==========================
       BUSINESS ACTIONS
       ========================== */

    // action recalculateBudget(
    //     ID : UUID
    // ) returns Budgets;

    // action generateInvoice(
    //     projectID  : UUID,
    //     periodFrom : Date,
    //     periodTo   : Date
    // ) returns Invoices;


    /* ==========================
       ANALYTICS FUNCTIONS
       ========================== */

    function getBurnSummary(
        projectID : UUID
    ) returns BurnSummary;
}


/* ==========================
   CUSTOM RETURN TYPE
   ========================== */

type BurnSummary {
    budgetAmount    : Decimal(15,2);
    consumedAmount  : Decimal(15,2);
    remainingAmount : Decimal(15,2);
    plannedHours    : Decimal(10,2);
    consumedHours   : Decimal(10,2);
    burnPercentage  : Decimal(5,2);
    budgetStatus    : String(20);
}