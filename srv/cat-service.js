const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    const {
        Departments,
        Employees,
        Managers,
        Clients,
        Projects,
        Budgets,
        Milestones,
        Tasks,
        Timesheets,
        TimesheetEntries,
        Invoices
    } = this.entities;


    /* =====================================================
       CREATE DEPARTMENT
       ===================================================== */

    this.on('createDepartment', async (request) => {

        const departmentData = request.data;

        const tx = cds.tx(request);

        let result = await tx.run(
            INSERT.into(Departments).entries(departmentData)
        ).then(() => {

            return departmentData;

        }).catch(err => {

            request.error(500, err.toString());

        });

        return result;
    });


    /* =====================================================
       CREATE EMPLOYEE
       ===================================================== */

    this.on('createEmployee', async (request) => {

        const empData = request.data;

        const tx = cds.tx(request);

        let result = await tx.run(
            INSERT.into(Employees).entries({
                firstName: empData.firstName,
                lastName: empData.lastName,
                email: empData.email,
                jobTitle: empData.jobTitle,
                joinDate: empData.joinDate,
                hourlyRate: empData.hourlyRate,
                status: empData.status,
                department_ID: empData.departmentID
            })
        ).then(() => {

            return empData;

        }).catch(err => {

            request.error(500, err.toString());

        });

        return result;
    });


    /* =====================================================
       CREATE MANAGER
       ===================================================== */

    this.on('createManager', async (request) => {

        const managerData = request.data;

        const tx = cds.tx(request);

        let result = await tx.run(
            INSERT.into(Managers).entries({
                employee_ID: managerData.employeeID,
                department_ID: managerData.departmentID,
                managerLevel: managerData.managerLevel,
                status: managerData.status
            })
        ).then(() => {

            return managerData;

        }).catch(err => {

            request.error(500, err.toString());

        });

        return result;
    });


    /* =====================================================
       CREATE CLIENT
       ===================================================== */

    this.on('createClient', async (request) => {

        const clientData = request.data;

        const tx = cds.tx(request);

        let result = await tx.run(
            INSERT.into(Clients).entries({
                clientName: clientData.clientName,
                contactPerson: clientData.contactPerson,
                email: clientData.email,
                phoneNumber: clientData.phoneNumber,
                country: clientData.country,
                industry: clientData.industry,
                status: clientData.status
            })
        ).then(() => {

            return clientData;

        }).catch(err => {

            request.error(500, err.toString());

        });

        return result;
    });


    /* =====================================================
       CREATE PROJECT
       ===================================================== */

    this.on('createProject', async (request) => {

        const projectData = request.data;

        const tx = cds.tx(request);

        let result = await tx.run(
            INSERT.into(Projects).entries({
                projectCode: projectData.projectCode,
                projectName: projectData.projectName,
                status: projectData.status,
                billingType: projectData.billingType,
                startDate: projectData.startDate,
                endDate: projectData.endDate,
                plannedHours: projectData.plannedHours,
                consumedHours: projectData.consumedHours,
                client_ID: projectData.clientID,
                manager_ID: projectData.managerID
            })
        ).then(() => {

            return projectData;

        }).catch(err => {

            request.error(500, err.toString());

        });

        return result;
    });


    /* =====================================================
       CREATE BUDGET
       ===================================================== */

    this.on('createBudget', async (request) => {

        const budgetData = request.data;

        const tx = cds.tx(request);

        let result = await tx.run(
            INSERT.into(Budgets).entries({
                project_ID: budgetData.projectID,
                budgetAmount: budgetData.budgetAmount,
                consumedAmount: budgetData.consumedAmount,
                remainingAmount: budgetData.remainingAmount,
                billingRateHr: budgetData.billingRateHr,
                currencyCode: budgetData.currencyCode,
                budgetStatus: budgetData.budgetStatus
            })
        ).then(() => {

            return budgetData;

        }).catch(err => {

            request.error(500, err.toString());

        });

        return result;
    });


    /* =====================================================
       CREATE MILESTONE
       ===================================================== */

    this.on('createMilestone', async (request) => {

        const milestoneData = request.data;

        const tx = cds.tx(request);

        let result = await tx.run(
            INSERT.into(Milestones).entries({
                project_ID: milestoneData.projectID,
                milestoneName: milestoneData.milestoneName,
                startDate: milestoneData.startDate,
                endDate: milestoneData.endDate,
                completionPercent: milestoneData.completionPercent,
                status: milestoneData.status
            })
        ).then(() => {

            return milestoneData;

        }).catch(err => {

            request.error(500, err.toString());

        });

        return result;
    });


    /* =====================================================
       CREATE TASK
       ===================================================== */

    this.on('createTask', async (request) => {

        const taskData = request.data;

        const tx = cds.tx(request);

        let result = await tx.run(
            INSERT.into(Tasks).entries({
                milestone_ID: taskData.milestoneID,
                taskName: taskData.taskName,
                startDate: taskData.startDate,
                endDate: taskData.endDate,
                status: taskData.status,
                estimatedHours: taskData.estimatedHours,
                actualHours: taskData.actualHours
            })
        ).then(() => {

            return taskData;

        }).catch(err => {

            request.error(500, err.toString());

        });

        return result;
    });


    /* =====================================================
       CREATE TIMESHEET
       ===================================================== */

    this.on('createTimesheet', async (request) => {

        const timesheetData = request.data;

        const tx = cds.tx(request);

        let result = await tx.run(
            INSERT.into(Timesheets).entries({
                employee_ID: timesheetData.employeeID,
                approvedBy_ID: timesheetData.approvedByID,
                invoice_ID: timesheetData.invoiceID,
                weekStartDate: timesheetData.weekStartDate,
                weekEndDate: timesheetData.weekEndDate,
                totalBillableHours: timesheetData.totalBillableHours,
                submittedDate: timesheetData.submittedDate,
                approvedDate: timesheetData.approvedDate,
                status: timesheetData.status
            })
        ).then(() => {

            return timesheetData;

        }).catch(err => {

            request.error(500, err.toString());

        });

        return result;
    });


    /* =====================================================
       CREATE TIMESHEET ENTRY
       ===================================================== */

    this.on('createTimesheetEntry', async (request) => {

        const entryData = request.data;

        const tx = cds.tx(request);

        let result = await tx.run(
            INSERT.into(TimesheetEntries).entries({
                timesheet_ID: entryData.timesheetID,
                task_ID: entryData.taskID,
                workDate: entryData.workDate,
                hours: entryData.hours,
                billable: entryData.billable
            })
        ).then(() => {

            return entryData;

        }).catch(err => {

            request.error(500, err.toString());

        });

        return result;
    });


    /* =====================================================
       CREATE INVOICE
       ===================================================== */

    this.on('createInvoice', async (request) => {

        const invoiceData = request.data;

        const tx = cds.tx(request);

        let result = await tx.run(
            INSERT.into(Invoices).entries({
                invoiceNumber: invoiceData.invoiceNumber,
                project_ID: invoiceData.projectID,
                client_ID: invoiceData.clientID,
                invoiceDate: invoiceData.invoiceDate,
                dueDate: invoiceData.dueDate,
                billableHours: invoiceData.billableHours,
                totalAmount: invoiceData.totalAmount,
                taxAmount: invoiceData.taxAmount,
                currencyCode: invoiceData.currencyCode,
                paymentStatus: invoiceData.paymentStatus,
                status: invoiceData.status
            })
        ).then(() => {

            return invoiceData;

        }).catch(err => {

            request.error(500, err.toString());

        });

        return result;
    });

    /* ==========================
       DEPARTMENTS
       ========================== */

    this.on('updateDepartment', async (req) => {
        const { ID, departmentName, description } = req.data;

        await UPDATE(Departments)
            .set({
                departmentName,
                description
            })
            .where({ ID });

        return SELECT.one.from(Departments).where({ ID });
    });

    this.on('deleteDepartment', async (req) => {
        const { ID } = req.data;

        await DELETE.from(Departments).where({ ID });

        return 'Department deleted successfully';
    });

    /* ==========================
       EMPLOYEES
       ========================== */

    this.on('updateEmployee', async (req) => {
        const {
            ID,
            firstName,
            lastName,
            email,
            jobTitle,
            hourlyRate,
            status
        } = req.data;

        await UPDATE(Employees)
            .set({
                firstName,
                lastName,
                email,
                jobTitle,
                hourlyRate,
                status
            })
            .where({ ID });

        return SELECT.one.from(Employees).where({ ID });
    });

    this.on('deleteEmployee', async (req) => {
        const { ID } = req.data;

        await DELETE.from(Employees).where({ ID });

        return 'Employee deleted successfully';
    });

    /* ==========================
       MANAGERS
       ========================== */

    this.on('updateManager', async (req) => {
        const { ID, managerLevel, status } = req.data;

        await UPDATE(Managers)
            .set({
                managerLevel,
                status
            })
            .where({ ID });

        return SELECT.one.from(Managers).where({ ID });
    });

    this.on('deleteManager', async (req) => {
        const { ID } = req.data;

        await DELETE.from(Managers).where({ ID });

        return 'Manager deleted successfully';
    });

    /* ==========================
       CLIENTS
       ========================== */

    this.on('updateClient', async (req) => {
        const {
            ID,
            clientName,
            contactPerson,
            email,
            phoneNumber,
            country,
            industry,
            status
        } = req.data;

        await UPDATE(Clients)
            .set({
                clientName,
                contactPerson,
                email,
                phoneNumber,
                country,
                industry,
                status
            })
            .where({ ID });

        return SELECT.one.from(Clients).where({ ID });
    });

    this.on('deleteClient', async (req) => {
        const { ID } = req.data;

        await DELETE.from(Clients).where({ ID });

        return 'Client deleted successfully';
    });

    /* ==========================
       PROJECTS
       ========================== */

    this.on('updateProject', async (req) => {
        const {
            ID,
            projectName,
            status,
            billingType,
            startDate,
            endDate,
            plannedHours,
            consumedHours
        } = req.data;

        await UPDATE(Projects)
            .set({
                projectName,
                status,
                billingType,
                startDate,
                endDate,
                plannedHours,
                consumedHours
            })
            .where({ ID });

        return SELECT.one.from(Projects).where({ ID });
    });

    this.on('deleteProject', async (req) => {
        const { ID } = req.data;

        await DELETE.from(Projects).where({ ID });

        return 'Project deleted successfully';
    });

    /* ==========================
       BUDGETS
       ========================== */

    this.on('updateBudget', async (req) => {
        const {
            ID,
            budgetAmount,
            consumedAmount,
            remainingAmount,
            billingRateHr,
            budgetStatus
        } = req.data;

        await UPDATE(Budgets)
            .set({
                budgetAmount,
                consumedAmount,
                remainingAmount,
                billingRateHr,
                budgetStatus
            })
            .where({ ID });

        return SELECT.one.from(Budgets).where({ ID });
    });

    this.on('deleteBudget', async (req) => {
        const { ID } = req.data;

        await DELETE.from(Budgets).where({ ID });

        return 'Budget deleted successfully';
    });

    this.on('recalculateBudget', async (req) => {

    const projectID = req.params[0].ID;

    const project = await SELECT.one
        .from(Projects)
        .where({
            ID: projectID
        });

    if (!project) {
        return req.reject(
            404,
            'Project not found'
        );
    }

    const budget = await SELECT.one
        .from(Budgets)
        .where({
            project_ID: projectID
        });

    if (!budget) {
        return req.reject(
            404,
            'Budget not found'
        );
    }

    const consumedAmount =
        Number(project.consumedHours || 0) *
        Number(budget.billingRateHr || 0);

    const remainingAmount =
        Number(budget.budgetAmount || 0) -
        consumedAmount;

    let budgetStatus = 'WithinBudget';

    const burnPercentage =
        (
            consumedAmount /
            Number(budget.budgetAmount || 1)
        ) * 100;

    if (burnPercentage >= 100) {

        budgetStatus = 'Breached';

    } else if (burnPercentage >= 80) {

        budgetStatus = 'AtRisk';
    }

    await UPDATE(Budgets)
        .set({
            consumedAmount,
            remainingAmount,
            budgetStatus
        })
        .where({
            ID: budget.ID
        });

    return await SELECT.one
        .from(Budgets)
        .where({
            ID: budget.ID
        });
});
    /* ==========================
       MILESTONES
       ========================== */

    this.on('updateMilestone', async (req) => {
        const {
            ID,
            milestoneName,
            startDate,
            endDate,
            completionPercent,
            status
        } = req.data;

        await UPDATE(Milestones)
            .set({
                milestoneName,
                startDate,
                endDate,
                completionPercent,
                status
            })
            .where({ ID });

        return SELECT.one.from(Milestones).where({ ID });
    });

    this.on('deleteMilestone', async (req) => {
        const { ID } = req.data;

        await DELETE.from(Milestones).where({ ID });

        return 'Milestone deleted successfully';
    });

    /* ==========================
       TASKS
       ========================== */

    this.on('updateTask', async (req) => {
        const {
            ID,
            taskName,
            startDate,
            endDate,
            status,
            estimatedHours,
            actualHours
        } = req.data;

        await UPDATE(Tasks)
            .set({
                taskName,
                startDate,
                endDate,
                status,
                estimatedHours,
                actualHours
            })
            .where({ ID });

        return SELECT.one.from(Tasks).where({ ID });
    });

    this.on('deleteTask', async (req) => {
        const { ID } = req.data;

        await DELETE.from(Tasks).where({ ID });

        return 'Task deleted successfully';
    });

    /* ==========================
       TIMESHEETS
       ========================== */

    this.on('updateTimesheet', async (req) => {
        const {
            ID,
            approvedByID,
            invoiceID,
            totalBillableHours,
            submittedDate,
            approvedDate,
            status
        } = req.data;

        await UPDATE(Timesheets)
            .set({
                approvedByID,
                invoiceID,
                totalBillableHours,
                submittedDate,
                approvedDate,
                status
            })
            .where({ ID });

        return SELECT.one.from(Timesheets).where({ ID });
    });

    this.on('deleteTimesheet', async (req) => {
        const { ID } = req.data;

        await DELETE.from(Timesheets).where({ ID });

        return 'Timesheet deleted successfully';
    });
    this.on('submitTimesheet', async (req) => {

    const ID = req.params[0].ID;

    const timesheet = await SELECT.one
        .from(Timesheets)
        .where({ ID });

    if (!timesheet) {
        return req.reject(
            404,
            'Timesheet not found'
        );
    }

    const entries = await SELECT
        .from(TimesheetEntries)
        .where({
            timesheet_ID: ID
        });

    if (!entries.length) {
        return req.reject(
            400,
            'No entries found'
        );
    }

    const dailyTotals = {};

    for (const entry of entries) {

        const date = String(entry.workDate);

        dailyTotals[date] =
            (dailyTotals[date] || 0) +
            Number(entry.hours);

        if (dailyTotals[date] > 24) {

            return req.reject(
                400,
                `Daily hours exceed 24 on ${date}`
            );
        }
    }

    await UPDATE(Timesheets)
        .set({
            status: 'Submitted',
            submittedDate: new Date()
        })
        .where({ ID });

    return await SELECT.one
        .from(Timesheets)
        .where({ ID });
    });

    this.on('approveTimesheet', async (req) => {

    const ID = req.params[0].ID;

    const timesheet = await SELECT.one
        .from(Timesheets)
        .where({ ID });

    if (!timesheet) {
        return req.reject(
            404,
            'Timesheet not found'
        );
    }

    await UPDATE(Timesheets)
        .set({
            status: 'Approved',
            approvedDate: new Date()
        })
        .where({ ID });

    return await SELECT.one
        .from(Timesheets)
        .where({ ID });
});
this.on('rejectTimesheet', async (req) => {

    const ID = req.params[0].ID;

    const { reason } = req.data;

    const timesheet = await SELECT.one
        .from(Timesheets)
        .where({ ID });

    if (!timesheet) {
        return req.reject(
            404,
            'Timesheet not found'
        );
    }

    if (!reason) {
        return req.reject(
            400,
            'Rejection reason is mandatory'
        );
    }

    if (timesheet.status !== 'Submitted') {
        return req.reject(
            400,
            'Only submitted timesheets can be rejected'
        );
    }

    await UPDATE(Timesheets)
        .set({
            status: 'Rejected',
            rejectionReason: reason
        })
        .where({ ID });

    return await SELECT.one
        .from(Timesheets)
        .where({ ID });
});


    /* ==========================
       TIMESHEET ENTRIES
       ========================== */

    this.on('updateTimesheetEntry', async (req) => {
        const {
            ID,
            workDate,
            hours,
            billable
        } = req.data;

        await UPDATE(TimesheetEntries)
            .set({
                workDate,
                hours,
                billable
            })
            .where({ ID });

        return SELECT.one.from(TimesheetEntries).where({ ID });
    });

    this.on('deleteTimesheetEntry', async (req) => {
        const { ID } = req.data;

        await DELETE.from(TimesheetEntries).where({ ID });

        return 'Timesheet Entry deleted successfully';
    });

    /* ==========================
       INVOICES
       ========================== */

    this.on('updateInvoice', async (req) => {
        const {
            ID,
            invoiceDate,
            dueDate,
            billableHours,
            totalAmount,
            taxAmount,
            paymentStatus,
            status
        } = req.data;

        await UPDATE(Invoices)
            .set({
                invoiceDate,
                dueDate,
                billableHours,
                totalAmount,
                taxAmount,
                paymentStatus,
                status
            })
            .where({ ID });

        return SELECT.one.from(Invoices).where({ ID });
    });

    this.on('deleteInvoice', async (req) => {
        const { ID } = req.data;

        await DELETE.from(Invoices).where({ ID });

        return 'Invoice deleted successfully';
    });

    this.on('generateInvoice', async (req) => {

    const projectID = req.params[0].ID;

    const project = await SELECT.one
        .from(Projects)
        .where({ ID: projectID });

    if (!project) {
        return req.reject(
            404,
            'Project not found'
        );
    }

    const budget = await SELECT.one
        .from(Budgets)
        .where({
            project_ID: projectID
        });

    if (!budget) {
        return req.reject(
            404,
            'Budget not found'
        );
    }

    const totalHours =
        Number(project.consumedHours || 0);

    const totalAmount =
        totalHours *
        Number(budget.billingRateHr || 0);

    const taxAmount =
        totalAmount * 0.18;

    await INSERT.into(Invoices)
        .entries({

            invoiceNumber:
                'INV-' + Date.now(),

            project_ID:
                projectID,

            client_ID:
                project.client_ID,

            invoiceDate:
                new Date(),

            dueDate:
                new Date(),

            billableHours:
                totalHours,

            totalAmount,

            taxAmount,

            currencyCode:
                budget.currencyCode,

            paymentStatus:
                'Draft',

            status:
                'Draft'
        });

    return await SELECT.one
        .from(Invoices)
        .orderBy({
            createdAt : 'desc'
        });
});
this.on('issue', async (req) => {

    const ID = req.params[0].ID;

    const invoice = await SELECT.one
        .from(Invoices)
        .where({ ID });

    if (!invoice) {
        return req.reject(
            404,
            'Invoice not found'
        );
    }

    if (invoice.paymentStatus === 'Issued') {
        return req.reject(
            400,
            'Invoice already issued'
        );
    }

    await UPDATE(Invoices)
        .set({
            paymentStatus: 'Issued',
            status: 'Issued'
        })
        .where({ ID });

    return await SELECT.one
        .from(Invoices)
        .where({ ID });
});

this.on('markPaid', async (req) => {

     const ID = req.params[0].ID;

    const invoice = await SELECT.one
        .from(Invoices)
        .where({ ID });

    if (!invoice) {
        return req.reject(
            404,
            'Invoice not found'
        );
    }

    if (invoice.paymentStatus !== 'Issued') {
        return req.reject(
            400,
            'Only issued invoices can be marked as paid'
        );
    }

    await UPDATE(Invoices)
        .set({
            paymentStatus: 'Paid',
            status: 'Paid'
        })
        .where({ ID });

    return await SELECT.one
        .from(Invoices)
        .where({ ID });
});









this.on('getBurnSummary', async (req) => {

    const { projectID } = req.data;

    const project = await SELECT.one
        .from(Projects)
        .where({ ID: projectID });

    if (!project) {
        return req.reject(
            404,
            'Project not found'
        );
    }

    const budget = await SELECT.one
        .from(Budgets)
        .where({
            project_ID: projectID
        });

    if (!budget) {
        return req.reject(
            404,
            'Budget not found'
        );
    }

    const burnPercentage =
        (
            Number(budget.consumedAmount || 0) /
            Number(budget.budgetAmount || 1)
        ) * 100;

    return {

        budgetAmount:
            budget.budgetAmount,

        consumedAmount:
            budget.consumedAmount,

        remainingAmount:
            budget.remainingAmount,

        plannedHours:
            project.plannedHours,

        consumedHours:
            project.consumedHours,

        burnPercentage:
            Number(
                burnPercentage.toFixed(2)
            ),

        budgetStatus:
            budget.budgetStatus
    };
});

});