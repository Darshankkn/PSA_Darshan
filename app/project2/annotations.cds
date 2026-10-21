using CatalogService as service from '../../srv/cat-service';

annotate service.Projects with @(

    UI.HeaderInfo : {
        TypeName : 'Project',
        TypeNamePlural : 'Projects',
        Title : {
            Value : projectName
        },
        Description : {
            Value : projectCode
        }
    },
    UI.Identification : [

    {
        $Type : 'UI.DataFieldForAction',
        Action : 'CatalogService.submit',
        Label : 'Submit Timesheet'
    },

    {
        $Type : 'UI.DataFieldForAction',
        Action : 'CatalogService.approve',
        Label : 'Approve'
    },

    {
        $Type : 'UI.DataFieldForAction',
        Action : 'CatalogService.reject',
        Label : 'Reject'
    }

],

    UI.SelectionFields : [
        projectCode,
        projectName,
        status
    ],

    UI.LineItem : [
        {
            Value : projectCode,
            Label : 'Project Code'
        },
        {
            Value : projectName,
            Label : 'Project Name'
        },
        {
            Value : status,
            Label : 'Status'
        },
        {
            Value : billingType,
            Label : 'Billing Type'
        },
        {
            Value : plannedHours,
            Label : 'Planned Hours'
        },
        {
            Value : consumedHours,
            Label : 'Consumed Hours'
        }
    ],

    UI.Facets : [

        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Project Information',
            Target : '@UI.FieldGroup#ProjectInfo'
        },

        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Budget Information',
            Target : 'budget/@UI.FieldGroup#BudgetInfo'
        },

        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Milestones',
            Target : 'milestones/@UI.LineItem'
        },

        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Invoices',
            Target : 'invoices/@UI.LineItem'
        }
    ],

    UI.FieldGroup #ProjectInfo : {
        Data : [

            {
                $Type : 'UI.DataField',
                Label : 'Project Code',
                Value : projectCode
            },

            {
                $Type : 'UI.DataField',
                Label : 'Project Name',
                Value : projectName
            },

            {
                $Type : 'UI.DataField',
                Label : 'Status',
                Value : status
            },

            {
                $Type : 'UI.DataField',
                Label : 'Billing Type',
                Value : billingType
            },

            {
                $Type : 'UI.DataField',
                Label : 'Planned Hours',
                Value : plannedHours
            },

            {
                $Type : 'UI.DataField',
                Label : 'Consumed Hours',
                Value : consumedHours
            },

            {
                $Type : 'UI.DataField',
                Label : 'Start Date',
                Value : startDate
            },

            {
                $Type : 'UI.DataField',
                Label : 'End Date',
                Value : endDate
            }
        ]
    }

);

annotate service.Budgets with @(

    UI.FieldGroup #BudgetInfo : {
        Data : [

            {
                $Type : 'UI.DataField',
                Label : 'Budget Amount',
                Value : budgetAmount
            },

            {
                $Type : 'UI.DataField',
                Label : 'Consumed Amount',
                Value : consumedAmount
            },

            {
                $Type : 'UI.DataField',
                Label : 'Remaining Amount',
                Value : remainingAmount
            },

            {
                $Type : 'UI.DataField',
                Label : 'Budget Status',
                Value : budgetStatus
            },

            {
                $Type : 'UI.DataField',
                Label : 'Billing Rate / Hour',
                Value : billingRateHr
            },

            {
                $Type : 'UI.DataField',
                Label : 'Currency',
                Value : currencyCode
            }
        ]
    }

);

annotate service.Milestones with @(

    UI.LineItem : [
        {
            Value : milestoneName,
            Label : 'Milestone Name'
        },
        {
            Value : startDate,
            Label : 'Start Date'
        },
        {
            Value : endDate,
            Label : 'End Date'
        },
        {
            Value : completionPercent,
            Label : 'Completion %'
        },
        {
            Value : status,
            Label : 'Status'
        }
    ]

);

// annotate service.Invoices with @(

//     UI.LineItem : [
//         {
//             Value : invoiceNumber,
//             Label : 'Invoice Number'
//         },
//         {
//             Value : billableHours,
//             Label : 'Billable Hours'
//         },
//         {
//             Value : totalAmount,
//             Label : 'Total Amount'
//         },
//         {
//             Value : paymentStatus,
//             Label : 'Payment Status'
//         },
//         {
//             Value : status,
//             Label : 'Status'
//         }
//     ]

// );