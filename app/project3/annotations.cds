using CatalogService as service from '../../srv/cat-service';

annotate service.Timesheets with @(

    UI.HeaderInfo : {
        TypeName : 'Timesheet',
        TypeNamePlural : 'Timesheets',

        Title : {
            Value : status
        },

        Description : {
            Value : weekStartDate
        }
    },

    UI.SelectionFields : [
        status,
        weekStartDate,
        weekEndDate
    ],
    UI.Identification : [

    {
        $Type : 'UI.DataFieldForAction',
        Action : 'CatalogService.submitTimesheet',
        Label : 'Submit Timesheet'
    },

    {
        $Type : 'UI.DataFieldForAction',
        Action : 'CatalogService.approveTimesheet',
        Label : 'Approve Timesheet'
    },

    {
        $Type : 'UI.DataFieldForAction',
        Action : 'CatalogService.rejectTimesheet',
        Label : 'Reject Timesheet'
    }

],

    UI.LineItem : [

        {
            Value : weekStartDate,
            Label : 'Week Start'
        },

        {
            Value : weekEndDate,
            Label : 'Week End'
        },

        {
            Value : totalBillableHours,
            Label : 'Billable Hours'
        },

        {
            Value : status,
            Label : 'Status'
        },

        {
            Value : submittedDate,
            Label : 'Submitted Date'
        },

        {
            Value : approvedDate,
            Label : 'Approved Date'
        }
    ],

    UI.Facets : [

        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Timesheet Information',
            Target : '@UI.FieldGroup#TimesheetInfo'
        },

        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Timesheet Entries',
            Target : 'entries/@UI.LineItem'
        }
    ],

    UI.FieldGroup #TimesheetInfo : {

        Data : [

            {
                $Type : 'UI.DataField',
                Label : 'Week Start Date',
                Value : weekStartDate
            },

            {
                $Type : 'UI.DataField',
                Label : 'Week End Date',
                Value : weekEndDate
            },

            {
                $Type : 'UI.DataField',
                Label : 'Billable Hours',
                Value : totalBillableHours
            },

            {
                $Type : 'UI.DataField',
                Label : 'Status',
                Value : status
            },

            {
                $Type : 'UI.DataField',
                Label : 'Submitted Date',
                Value : submittedDate
            },

            {
                $Type : 'UI.DataField',
                Label : 'Approved Date',
                Value : approvedDate
            },

            {
                $Type : 'UI.DataField',
                Label : 'Rejection Reason',
                Value : rejectionReason
            }
        ]
    }

);

annotate service.TimesheetEntries with @(

    UI.LineItem : [

        {
            Value : workDate,
            Label : 'Work Date'
        },

        {
            Value : hours,
            Label : 'Hours'
        },

        {
            Value : billable,
            Label : 'Billable'
        }
    ]
);