/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require([
    "scholarshipapp/scholarshipsubmission/test/unit/AllTests"
], function () {
    "use strict";

    QUnit.start();
});