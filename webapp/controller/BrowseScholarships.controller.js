sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (
    Controller,
    JSONModel,
    Filter,
    FilterOperator,
    Sorter,
    MessageToast,
    MessageBox
) {
    "use strict";

    return Controller.extend(
        "scholarshipapp.scholarshipsubmission.controller.BrowseScholarships",
        {

            onInit: function () {
                // Get your OData V4 model by its name
                var oModel = this.getOwnerComponent().getModel("zsd_scholar_subm");

                // Create a list binding specifying the Entity Set name
                var oListBinding = oModel.bindList("/ZI_SchSubmission");

                // Request the contexts (fetches data from backend)
                oListBinding.requestContexts().then(function (aContexts) {
                    var aStudents = aContexts.map(function (oContext) {
                        return oContext.getObject();
                    });

                    console.log(aStudents);

                });

                var aScholarships = [
                    {
                        id: "SCH001",
                        name: "Merit Excellence Scholarship",
                        category: "Academic Excellence",
                        description: "Financial support for students with excellent academic performance.",
                        amount: "₹50,000",
                        amountValue: 50000,
                        deadline: "30 Nov 2026",
                        deadlineSort: "2026-11-30",
                        eligibility: "Minimum 85% marks",
                        status: "Open",
                        statusState: "Success",
                        canApply: true,
                        icon: "sap-icon://study-leave"
                    },
                    {
                        id: "SCH002",
                        name: "Student Financial Assistance",
                        category: "Need Based",
                        description: "Financial assistance for students from economically weaker backgrounds.",
                        amount: "₹30,000",
                        amountValue: 30000,
                        deadline: "15 Dec 2026",
                        deadlineSort: "2026-12-15",
                        eligibility: "Family income criteria",
                        status: "Open",
                        statusState: "Success",
                        canApply: true,
                        icon: "sap-icon://money-bills"
                    },
                    {
                        id: "SCH003",
                        name: "Future Technology Scholarship",
                        category: "STEM",
                        description: "Encouraging students pursuing science, technology and engineering.",
                        amount: "₹75,000",
                        amountValue: 75000,
                        deadline: "10 Nov 2026",
                        deadlineSort: "2026-11-10",
                        eligibility: "STEM course students",
                        status: "Closing Soon",
                        statusState: "Warning",
                        canApply: true,
                        icon: "sap-icon://lab"
                    },
                    {
                        id: "SCH004",
                        name: "Women Education Scholarship",
                        category: "Women in Education",
                        description: "Supporting women pursuing higher education and professional courses.",
                        amount: "₹40,000",
                        amountValue: 40000,
                        deadline: "20 Dec 2026",
                        deadlineSort: "2026-12-20",
                        eligibility: "Eligible female students",
                        status: "Open",
                        statusState: "Success",
                        canApply: true,
                        icon: "sap-icon://group"
                    },
                    {
                        id: "SCH005",
                        name: "Inclusive Education Grant",
                        category: "Special Category",
                        description: "Educational support for students meeting special eligibility criteria.",
                        amount: "₹25,000",
                        amountValue: 25000,
                        deadline: "05 Nov 2026",
                        deadlineSort: "2026-11-05",
                        eligibility: "Special category criteria",
                        status: "Closing Soon",
                        statusState: "Warning",
                        canApply: true,
                        icon: "sap-icon://heart"
                    }
                ];

                var oModel = new JSONModel({
                    scholarships: aScholarships,
                    resultText: aScholarships.length + " scholarships found"
                });

                this.getView().setModel(oModel, "browse");
                this._applyFilters();
            },

            onSearch: function () {
                this._applyFilters();
            },

            onFilterChange: function () {
                this._applyFilters();
            },

            onClearFilters: function () {

                this.byId("scholarshipSearch").setValue("");
                this.byId("categoryFilter").setSelectedKey("ALL");
                this.byId("statusFilter").setSelectedKey("ALL");
                this.byId("sortFilter").setSelectedKey("NAME");

                this._applyFilters();
            },

            _applyFilters: function () {

                var oBinding = this.byId("scholarshipCards")
                    .getBinding("items");

                var sSearch = this.byId("scholarshipSearch")
                    .getValue().trim();

                var sCategory = this.byId("categoryFilter")
                    .getSelectedKey();

                var sStatus = this.byId("statusFilter")
                    .getSelectedKey();

                var sSort = this.byId("sortFilter")
                    .getSelectedKey();

                var aFilters = [];

                if (sSearch) {
                    aFilters.push(new Filter({
                        filters: [
                            new Filter("name", FilterOperator.Contains, sSearch),
                            new Filter("category", FilterOperator.Contains, sSearch),
                            new Filter("description", FilterOperator.Contains, sSearch)
                        ],
                        and: false
                    }));
                }

                if (sCategory !== "ALL") {
                    aFilters.push(
                        new Filter("category", FilterOperator.EQ, sCategory)
                    );
                }

                if (sStatus !== "ALL") {
                    aFilters.push(
                        new Filter("status", FilterOperator.EQ, sStatus)
                    );
                }

                var oSorter;

                if (sSort === "AMOUNT") {
                    oSorter = new Sorter("amountValue", true);
                } else if (sSort === "DEADLINE") {
                    oSorter = new Sorter("deadlineSort", false);
                } else {
                    oSorter = new Sorter("name", false);
                }

                oBinding.filter(aFilters);
                oBinding.sort(oSorter);

                var iCount = oBinding.getLength();

                this.getView().getModel("browse")
                    .setProperty("/resultText", iCount + " scholarships found");
            },

            onViewDetails: function (oEvent) {

                var oContext = oEvent.getSource()
                    .getBindingContext("browse");

                var oScholarship = oContext.getObject();

                MessageBox.information(
                    "Scholarship: " + oScholarship.name +
                    "\n\nCategory: " + oScholarship.category +
                    "\nAward: " + oScholarship.amount +
                    "\nDeadline: " + oScholarship.deadline +
                    "\nEligibility: " + oScholarship.eligibility
                );
            },

            onApplyNow: function (oEvent) {

                var oContext = oEvent.getSource()
                    .getBindingContext("browse");

                var oScholarship = oContext.getObject();

                MessageBox.confirm(
                    "Do you want to apply for " + oScholarship.name + "?",
                    {
                        title: "Confirm Application",
                        onClose: function (sAction) {
                            if (sAction === MessageBox.Action.OK) {
                                MessageToast.show(
                                    "Application flow for " +
                                    oScholarship.name +
                                    " will be connected to RAP."
                                );
                            }
                        }
                    }
                );
            }

        }
    );
});