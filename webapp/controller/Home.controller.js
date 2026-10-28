
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (
    Controller,
    JSONModel,
    Filter,
    FilterOperator,
    MessageToast
) {
    "use strict";

    return Controller.extend(
        "scholarshipapp.scholarshipsubmission.controller.Home",
        {
            onInit: function () {
                var oData = {
                    navigation: [
                        {
                            title: "Home",
                            icon: "sap-icon://home",
                            type: "Emphasized"
                        },
                        {
                            title: "Browse Scholarships",
                            icon: "sap-icon://search",
                            type: "Transparent"
                        },
                        {
                            title: "My Applications",
                            icon: "sap-icon://documents",
                            type: "Transparent"
                        },
                        {
                            title: "My Profile",
                            icon: "sap-icon://person-placeholder",
                            type: "Transparent"
                        },
                        {
                            title: "Help & Support",
                            icon: "sap-icon://headset",
                            type: "Transparent"
                        }
                    ],

                    categories: [
                        {
                            title: "Academic Excellence",
                            description: "For high-performing students",
                            icon: "sap-icon://study-leave"
                        },
                        {
                            title: "Need Based",
                            description: "For economically weaker sections",
                            icon: "sap-icon://group"
                        },
                        {
                            title: "STEM",
                            description: "Science, technology and engineering",
                            icon: "sap-icon://lab"
                        },
                        {
                            title: "Women in Education",
                            description: "For women pursuing higher education",
                            icon: "sap-icon://person-placeholder"
                        },
                        {
                            title: "Special Category",
                            description: "For eligible special categories",
                            icon: "sap-icon://education"
                        }
                    ],

                    scholarships: [
                        {
                            name: "Merit Scholarship",
                            category: "Merit Based",
                            description: "For outstanding academic performance.",
                            amount: "Up to ₹50,000",
                            deadline: "Apply by 30 Nov 2026",
                            image: "images/merit.jpg"
                        },
                        {
                            name: "Need-Based Scholarship",
                            category: "Need Based",
                            description: "Support for students who need financial assistance.",
                            amount: "Up to ₹75,000",
                            deadline: "Apply by 15 Dec 2026",
                            image: "images/need-based.jpg"
                        },
                        {
                            name: "STEM Scholarship",
                            category: "STEM",
                            description: "For science, technology, engineering and mathematics.",
                            amount: "Up to ₹1,00,000",
                            deadline: "Apply by 20 Dec 2026",
                            image: "images/stem.jpg"
                        },
                        {
                            name: "Women in Education",
                            category: "Women in Education",
                            description: "Support for women pursuing higher education.",
                            amount: "Up to ₹60,000",
                            deadline: "Apply by 10 Dec 2026",
                            image: "images/women-education.jpg"
                        }
                    ],

                    quickActions: [
                        {
                            title: "Browse Scholarships",
                            description: "Find the right scholarship for you",
                            icon: "sap-icon://search"
                        },
                        {
                            title: "View My Applications",
                            description: "Track your application status",
                            icon: "sap-icon://documents"
                        },
                        {
                            title: "Update Profile",
                            description: "Keep your information current",
                            icon: "sap-icon://person-placeholder"
                        },
                        {
                            title: "Get Help",
                            description: "FAQs and support resources",
                            icon: "sap-icon://sys-help"
                        }
                    ],

                    progress: [
                        {
                            title: "Submitted",
                            date: "05 Oct 2026",
                            status: "Completed",
                            state: "Success",
                            icon: "sap-icon://status-positive"
                        },
                        {
                            title: "Under Review",
                            date: "12 Oct 2026",
                            status: "In progress",
                            state: "Information",
                            icon: "sap-icon://history"
                        },
                        {
                            title: "Document Verification",
                            date: "Pending",
                            status: "Pending",
                            state: "None",
                            icon: "sap-icon://shield"
                        },
                        {
                            title: "Decision",
                            date: "Pending",
                            status: "Pending",
                            state: "None",
                            icon: "sap-icon://task"
                        }
                    ],

                    notifications: [
                        {
                            title: "Application submitted",
                            description: "Application SC-2026-00123 submitted successfully.",
                            time: "2h ago",
                            icon: "sap-icon://message-success"
                        },
                        {
                            title: "Additional documents required",
                            description: "Check the documents needed for your application.",
                            time: "1d ago",
                            icon: "sap-icon://message-warning"
                        },
                        {
                            title: "Scholarship results announced",
                            description: "Check the latest scholarship updates.",
                            time: "2d ago",
                            icon: "sap-icon://information"
                        }
                    ],

                    applications: [
                        {
                            id: "SC-2026-00123",
                            name: "Merit Scholarship",
                            type: "Merit Based",
                            status: "Under Review",
                            state: "Warning",
                            updated: "12 Oct 2026",
                            action: "View"
                        },
                        {
                            id: "SC-2026-00098",
                            name: "Need-Based Scholarship",
                            type: "Need Based",
                            status: "Submitted",
                            state: "Information",
                            updated: "05 Oct 2026",
                            action: "View"
                        },
                        {
                            id: "SC-2026-00076",
                            name: "STEM Scholarship",
                            type: "STEM",
                            status: "Draft",
                            state: "None",
                            updated: "28 Sep 2026",
                            action: "Continue"
                        },
                        {
                            id: "SC-2026-00045",
                            name: "Women in Education",
                            type: "Women in Education",
                            status: "Approved",
                            state: "Success",
                            updated: "20 Sep 2026",
                            action: "View"
                        }
                    ]
                };

                this.getView().setModel(
                    new JSONModel(oData),
                    "dashboard"
                );
            },

            onSearch: function (oEvent) {
                var sQuery = oEvent.getParameter("query") ||
                    oEvent.getSource().getValue();

                var oBinding = this.byId(
                    "scholarshipList"
                );

                if (oBinding) {
                    var aFilters = [];

                    if (sQuery) {
                        aFilters.push(new Filter({
                            filters: [
                                new Filter(
                                    "name",
                                    FilterOperator.Contains,
                                    sQuery
                                ),
                                new Filter(
                                    "category",
                                    FilterOperator.Contains,
                                    sQuery
                                ),
                                new Filter(
                                    "description",
                                    FilterOperator.Contains,
                                    sQuery
                                )
                            ],
                            and: false
                        }));
                    }

                    oBinding.getBinding("items").filter(aFilters);
                } else {
                    MessageToast.show(
                        sQuery
                            ? "Search: " + sQuery
                            : "Enter a scholarship name or category."
                    );
                }
            },

            onNavigate: function (oEvent) {
                var oContext = oEvent.getSource()
                    .getBindingContext("dashboard");

                if (!oContext) {
                    return;
                }

                var sTitle = oContext.getProperty("title");

                MessageToast.show("Selected: " + sTitle);

                // Connect to your existing router here.
            },

            onCategoryPress: function (oEvent) {
                var oContext = oEvent.getSource()
                    .getBindingContext("dashboard");

                if (oContext) {
                    MessageToast.show(
                        "Category: " +
                        oContext.getProperty("title")
                    );
                }
            },

            onViewScholarship: function (oEvent) {
                var oContext = oEvent.getSource()
                    .getBindingContext("dashboard");

                if (oContext) {
                    MessageToast.show(
                        "Selected: " +
                        oContext.getProperty("name")
                    );
                }
            },

            onQuickAction: function (oEvent) {
                var oItem = oEvent.getSource();
                MessageToast.show(
                    oItem.getTitle()
                );

                // Connect to the corresponding route.
            },

            onBrowseScholarships: function () {
                MessageToast.show("Browse Scholarships");
            },

            onViewApplications: function () {
                MessageToast.show("My Applications");
            },

            onApplicationAction: function (oEvent) {
                var oContext = oEvent.getSource()
                    .getBindingContext("dashboard");

                if (oContext) {
                    MessageToast.show(
                        oContext.getProperty("action") +
                        " application " +
                        oContext.getProperty("id")
                    );
                }
            },

            onNotifications: function () {
                MessageToast.show("Notifications");
            },

            onNotificationPress: function (oEvent) {
                MessageToast.show(
                    oEvent.getSource().getTitle()
                );
            }
        }
    );
});
