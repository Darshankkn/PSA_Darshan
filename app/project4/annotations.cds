// using CatalogService as service from '../../srv/cat-service';

// annotate service.Invoices with @(

//     UI.HeaderInfo : {
//         TypeName : 'Invoice',
//         TypeNamePlural : 'Invoices',
//         Title : {
//             Value : invoiceNumber
//         }
//     },

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
//         }
//     ]
// );


using CatalogService as service from '../../srv/cat-service';

annotate service.Invoices with @(

    UI.HeaderInfo : {
        TypeName : 'Invoice',
        TypeNamePlural : 'Invoices',

        Title : {
            Value : invoiceNumber
        },

        Description : {
            Value : paymentStatus
        }
    },

    UI.SelectionFields : [
        invoiceNumber,
        paymentStatus,
        status
    ],

    UI.LineItem : [

        {
            Value : invoiceNumber,
            Label : 'Invoice Number'
        },

        {
            Value : billableHours,
            Label : 'Billable Hours'
        },

        {
            Value : totalAmount,
            Label : 'Total Amount'
        },

        {
            Value : taxAmount,
            Label : 'Tax Amount'
        },

        {
            Value : paymentStatus,
            Label : 'Payment Status'
        },

        {
            Value : status,
            Label : 'Status'
        }
    ],

    UI.Facets : [

        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Invoice Information',
            Target : '@UI.FieldGroup#InvoiceInfo'
        }

    ],

    UI.FieldGroup #InvoiceInfo : {

        Data : [

            {
                $Type : 'UI.DataField',
                Label : 'Invoice Number',
                Value : invoiceNumber
            },

            {
                $Type : 'UI.DataField',
                Label : 'Invoice Date',
                Value : invoiceDate
            },

            {
                $Type : 'UI.DataField',
                Label : 'Due Date',
                Value : dueDate
            },

            {
                $Type : 'UI.DataField',
                Label : 'Billable Hours',
                Value : billableHours
            },

            {
                $Type : 'UI.DataField',
                Label : 'Total Amount',
                Value : totalAmount
            },

            {
                $Type : 'UI.DataField',
                Label : 'Tax Amount',
                Value : taxAmount
            },

            {
                $Type : 'UI.DataField',
                Label : 'Currency',
                Value : currencyCode
            },

            {
                $Type : 'UI.DataField',
                Label : 'Payment Status',
                Value : paymentStatus
            },

            {
                $Type : 'UI.DataField',
                Label : 'Invoice Status',
                Value : status
            }

        ]
    }

);