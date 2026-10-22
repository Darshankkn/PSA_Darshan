sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Label",
    "sap/m/TextArea",
    "sap/m/Button"
], function (
    Controller,
    JSONModel,
    MessageToast,
    MessageBox,
    Dialog,
    Label,
    TextArea,
    Button
) {
    "use strict";

    return Controller.extend("manager.controller.Manager", {

        /* =====================================================
           INITIALIZATION
           ===================================================== */

        onInit: function () {
            this._loadDashboardData();
        },

        /* =====================================================
           LOAD LIVE DASHBOARD DATA
           ===================================================== */

        _loadDashboardData: async function () {
            const oView = this.getView();

            oView.setBusy(true);

            try {
                const oODataModel =
                    this.getOwnerComponent().getModel();

                if (!oODataModel) {
                    throw new Error(
                        "OData model is unavailable. Check manifest.json."
                    );
                }

                const [
                    aProjectContexts,
                    aTimesheetContexts,
                    aInvoiceContexts,
                    aBudgetContexts
                ] = await Promise.all([
                    oODataModel
                        .bindList("/Projects")
                        .requestContexts(),

                    oODataModel
                        .bindList(
                            "/Timesheets",
                            null,
                            null,
                            null,
                            {
                                $expand: "employee"
                            }
                        )
                        .requestContexts(),

                    oODataModel
                        .bindList("/Invoices")
                        .requestContexts(),

                    oODataModel
                        .bindList("/Budgets")
                        .requestContexts()
                ]);

                const aProjects =
                    aProjectContexts.map(function (oContext) {
                        return oContext.getObject();
                    });

                const aTimesheets =
                    aTimesheetContexts.map(function (oContext) {
                        return oContext.getObject();
                    });

                const aInvoices =
                    aInvoiceContexts.map(function (oContext) {
                        return oContext.getObject();
                    });

                const aBudgets =
                    aBudgetContexts.map(function (oContext) {
                        return oContext.getObject();
                    });

                /* =============================================
                   PENDING TIMESHEET APPROVALS
                   ============================================= */

                const aPendingApprovals =
                    aTimesheets
                        .filter(function (oTimesheet) {
                            return (
                                oTimesheet.status ===
                                "Submitted"
                            );
                        })
                        .map(function (oTimesheet) {
                            const oEmployee =
                                oTimesheet.employee || {};

                            const sEmployeeName = [
                                oEmployee.firstName,
                                oEmployee.lastName
                            ]
                                .filter(Boolean)
                                .join(" ");

                            return {
                                ID: oTimesheet.ID,

                                employee:
                                    sEmployeeName ||
                                    oTimesheet.employee_ID ||
                                    "Employee not assigned",

                                status:
                                    oTimesheet.status,

                                hours:
                                    Number(
                                        oTimesheet
                                            .totalBillableHours || 0
                                    ),

                                weekStartDate:
                                    oTimesheet.weekStartDate || "",

                                weekEndDate:
                                    oTimesheet.weekEndDate || ""
                            };
                        });

                /* =============================================
                   MANAGED PROJECTS
                   ============================================= */

                const aManagedProjects =
                    aProjects.map(function (oProject) {
                        return {
                            ID: oProject.ID,

                            projectCode:
                                oProject.projectCode || "",

                            projectName:
                                oProject.projectName || "",

                            status:
                                oProject.status || "",

                            consumedHours:
                                Number(
                                    oProject.consumedHours || 0
                                )
                        };
                    });

                /* =============================================
                   KPI VALUES
                   ============================================= */

                const iActiveProjects =
                    aProjects.filter(function (oProject) {
                        return oProject.status === "Active";
                    }).length;

                const iPaidInvoices =
                    aInvoices.filter(function (oInvoice) {
                        return (
                            oInvoice.paymentStatus === "Paid" ||
                            oInvoice.status === "Paid"
                        );
                    }).length;

                const iAtRiskBudgets =
                    aBudgets.filter(function (oBudget) {
                        const sStatus = String(
                            oBudget.budgetStatus || ""
                        )
                            .replace(/\s+/g, "")
                            .toLowerCase();

                        return sStatus === "atrisk";
                    }).length;

                /* =============================================
                   PROJECT STATUS SUMMARY
                   ============================================= */

                const aProjectStatus = [
                    {
                        status: "Active",

                        count:
                            aProjects.filter(
                                function (oProject) {
                                    return (
                                        oProject.status ===
                                        "Active"
                                    );
                                }
                            ).length
                    },
                    {
                        status: "Draft",

                        count:
                            aProjects.filter(
                                function (oProject) {
                                    return (
                                        oProject.status ===
                                        "Draft"
                                    );
                                }
                            ).length
                    },
                    {
                        status: "Completed",

                        count:
                            aProjects.filter(
                                function (oProject) {
                                    return (
                                        oProject.status ===
                                        "Completed"
                                    );
                                }
                            ).length
                    },
                    {
                        status: "On Hold",

                        count:
                            aProjects.filter(
                                function (oProject) {
                                    return (
                                        oProject.status ===
                                            "OnHold" ||
                                        oProject.status ===
                                            "On Hold"
                                    );
                                }
                            ).length
                    }
                ];

                /* =============================================
                   DASHBOARD JSON MODEL
                   ============================================= */

                const oDashboardModel =
                    new JSONModel({
                        activeProjects:
                            iActiveProjects,

                        pendingApprovals:
                            aPendingApprovals.length,

                        paidInvoices:
                            iPaidInvoices,

                        atRiskBudgets:
                            iAtRiskBudgets,

                        approvals:
                            aPendingApprovals,

                        projects:
                            aManagedProjects,

                        projectStatus:
                            aProjectStatus
                    });

                oDashboardModel.setSizeLimit(1000);

                oView.setModel(
                    oDashboardModel,
                    "dashboard"
                );

            } catch (oError) {
                console.error(
                    "Manager dashboard loading failed:",
                    oError
                );

                oView.setModel(
                    new JSONModel({
                        activeProjects: 0,
                        pendingApprovals: 0,
                        paidInvoices: 0,
                        atRiskBudgets: 0,
                        approvals: [],
                        projects: [],
                        projectStatus: []
                    }),
                    "dashboard"
                );

                MessageBox.error(
                    oError.message ||
                    "Dashboard data could not be loaded."
                );

            } finally {
                oView.setBusy(false);
            }
        },

        /* =====================================================
           GENERIC BOUND ACTION EXECUTOR
           ===================================================== */

        _executeBoundAction: async function (
            sEntitySet,
            sRecordID,
            sActionName,
            mParameters
        ) {
            const oODataModel =
                this.getOwnerComponent().getModel();

            if (!oODataModel) {
                throw new Error(
                    "OData model is unavailable."
                );
            }

            if (!sRecordID) {
                throw new Error(
                    "Record ID is required."
                );
            }

            const sActionPath =
                "/" +
                sEntitySet +
                "(" +
                sRecordID +
                ")/CatalogService." +
                sActionName +
                "(...)";

            const oActionBinding =
                oODataModel.bindContext(
                    sActionPath
                );

            if (mParameters) {
                Object.keys(mParameters)
                    .forEach(function (sParameterName) {
                        oActionBinding.setParameter(
                            sParameterName,
                            mParameters[sParameterName]
                        );
                    });
            }

            await oActionBinding.execute();

            return oActionBinding.getBoundContext();
        },

        /* =====================================================
           REFRESH
           ===================================================== */

        onRefresh: async function () {
            await this._loadDashboardData();

            MessageToast.show(
                "Dashboard refreshed"
            );
        },

        /* =====================================================
           APPROVE TIMESHEET
           Bound action: approveTimesheet
           ===================================================== */

        onApproveTimesheet: function (oEvent) {
            const oButton =
                oEvent.getSource();

            const oContext =
                oButton.getBindingContext("dashboard");

            const oTimesheet =
                oContext && oContext.getObject();

            if (!oTimesheet || !oTimesheet.ID) {
                MessageBox.error(
                    "Timesheet ID is unavailable."
                );
                return;
            }

            MessageBox.confirm(
                "Approve this timesheet?",
                {
                    title: "Approve Timesheet",

                    emphasizedAction:
                        MessageBox.Action.OK,

                    actions: [
                        MessageBox.Action.OK,
                        MessageBox.Action.CANCEL
                    ],

                    onClose: async function (sAction) {
                        if (
                            sAction !==
                            MessageBox.Action.OK
                        ) {
                            return;
                        }

                        try {
                            oButton.setBusy(true);

                            await this._executeBoundAction(
                                "Timesheets",
                                oTimesheet.ID,
                                "approveTimesheet"
                            );

                            MessageToast.show(
                                "Timesheet approved successfully"
                            );

                            await this._loadDashboardData();

                        } catch (oError) {
                            console.error(
                                "Timesheet approval failed:",
                                oError
                            );

                            MessageBox.error(
                                oError.message ||
                                "Timesheet approval failed."
                            );

                        } finally {
                            oButton.setBusy(false);
                        }
                    }.bind(this)
                }
            );
        },

        /* =====================================================
           REJECT TIMESHEET
           Bound action: rejectTimesheet
           ===================================================== */

        onRejectTimesheet: function (oEvent) {
            const oButton =
                oEvent.getSource();

            const oContext =
                oButton.getBindingContext("dashboard");

            const oTimesheet =
                oContext && oContext.getObject();

            if (!oTimesheet || !oTimesheet.ID) {
                MessageBox.error(
                    "Timesheet ID is unavailable."
                );
                return;
            }

            const oReasonTextArea =
                new TextArea({
                    width: "100%",
                    rows: 4,
                    placeholder:
                        "Enter the rejection reason"
                });

            const oDialog =
                new Dialog({
                    title: "Reject Timesheet",
                    contentWidth: "30rem",

                    content: [
                        new Label({
                            text: "Rejection Reason",
                            required: true,
                            labelFor: oReasonTextArea
                        }).addStyleClass(
                            "sapUiSmallMargin"
                        ),

                        oReasonTextArea.addStyleClass(
                            "sapUiSmallMargin"
                        )
                    ],

                    beginButton:
                        new Button({
                            text: "Reject",
                            type: "Reject",

                            press: async function () {
                                const sReason =
                                    oReasonTextArea
                                        .getValue()
                                        .trim();

                                if (!sReason) {
                                    MessageBox.warning(
                                        "Rejection reason is mandatory."
                                    );
                                    return;
                                }

                                try {
                                    oDialog.setBusy(true);

                                    await this
                                        ._executeBoundAction(
                                            "Timesheets",
                                            oTimesheet.ID,
                                            "rejectTimesheet",
                                            {
                                                reason:
                                                    sReason
                                            }
                                        );

                                    MessageToast.show(
                                        "Timesheet rejected successfully"
                                    );

                                    oDialog.close();

                                    await this
                                        ._loadDashboardData();

                                } catch (oError) {
                                    console.error(
                                        "Timesheet rejection failed:",
                                        oError
                                    );

                                    MessageBox.error(
                                        oError.message ||
                                        "Timesheet rejection failed."
                                    );

                                } finally {
                                    oDialog.setBusy(false);
                                }
                            }.bind(this)
                        }),

                    endButton:
                        new Button({
                            text: "Cancel",

                            press: function () {
                                oDialog.close();
                            }
                        }),

                    afterClose: function () {
                        oDialog.destroy();
                    }
                });

            this.getView().addDependent(oDialog);

            oDialog.open();
        },

        /* =====================================================
           RECALCULATE BUDGET
           Bound action: recalculateBudget
           ===================================================== */

        onRecalculateBudget: async function (oEvent) {
            const oButton =
                oEvent.getSource();

            const oContext =
                oButton.getBindingContext("dashboard");

            const oProject =
                oContext && oContext.getObject();

            if (!oProject || !oProject.ID) {
                MessageBox.error(
                    "Project ID is unavailable."
                );
                return;
            }

            try {
                oButton.setBusy(true);

                await this._executeBoundAction(
                    "Projects",
                    oProject.ID,
                    "recalculateBudget"
                );

                MessageToast.show(
                    "Budget recalculated successfully"
                );

                await this._loadDashboardData();

            } catch (oError) {
                console.error(
                    "Budget recalculation failed:",
                    oError
                );

                MessageBox.error(
                    oError.message ||
                    "Budget recalculation failed."
                );

            } finally {
                oButton.setBusy(false);
            }
        },

        /* =====================================================
           GENERATE INVOICE
           Bound action: generateInvoice
           ===================================================== */

        onGenerateInvoice: function (oEvent) {
            const oButton =
                oEvent.getSource();

            const oContext =
                oButton.getBindingContext("dashboard");

            const oProject =
                oContext && oContext.getObject();

            if (!oProject || !oProject.ID) {
                MessageBox.error(
                    "Project ID is unavailable."
                );
                return;
            }

            MessageBox.confirm(
                "Generate an invoice for " +
                oProject.projectName +
                "?",
                {
                    title: "Generate Invoice",

                    emphasizedAction:
                        MessageBox.Action.OK,

                    actions: [
                        MessageBox.Action.OK,
                        MessageBox.Action.CANCEL
                    ],

                    onClose: async function (sAction) {
                        if (
                            sAction !==
                            MessageBox.Action.OK
                        ) {
                            return;
                        }

                        try {
                            oButton.setBusy(true);

                            await this._executeBoundAction(
                                "Projects",
                                oProject.ID,
                                "generateInvoice"
                            );

                            MessageToast.show(
                                "Invoice generated successfully"
                            );

                            await this._loadDashboardData();

                        } catch (oError) {
                            console.error(
                                "Invoice generation failed:",
                                oError
                            );

                            MessageBox.error(
                                oError.message ||
                                "Invoice generation failed."
                            );

                        } finally {
                            oButton.setBusy(false);
                        }
                    }.bind(this)
                }
            );
        },

        /* =====================================================
           QUICK NAVIGATION
           Current local CAP app folders:
           project3 = Projects
           project2 = Timesheets
           project4 = Invoices
           ===================================================== */

        _navigateToApplication: function (sApplicationPath) {
            const sTargetUrl =
                new URL(
                    sApplicationPath,
                    window.location.origin
                ).toString();

            window.location.assign(
                sTargetUrl
            );
        },

        onProjects: function () {
            this._navigateToApplication(
                "/project3/webapp/index.html"
            );
        },

        onTimesheets: function () {
            this._navigateToApplication(
                "/project2/webapp/index.html"
            );
        },

        onInvoices: function () {
            this._navigateToApplication(
                "/project4/webapp/index.html"
            );
        }

    });
});