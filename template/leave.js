var _;
(function (_) {
    function isEdit(ctx) {
        return ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm
            || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm;
    }
    function disableField(fld, ctx) {
        if (isEdit(ctx)) {
            CSR.getControl(fld).disabled = true;
        }
    }
    function init() {
        var isApproved = false;
        CSR.override()
            .computedValue("Title", function (t) { return t + " " + _spPageContextInfo.userDisplayName; }, "LeaveType")
            .onPostRenderField("Title", disableField)
            .onPostRenderField("LeaveApproved", disableField)
            .onPostRenderField("LeaveApproved", function (fld, ctx) {
            var isApproved = ctx.ListData.Items[0]["LeaveApproved"] === "1";
            if (isApproved && isEdit(ctx)) {
                GoBack();
            }
        })
            .register();
    }
    SP.SOD.executeOrDelayUntilScriptLoaded(init, "tstmpl.ts");
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/SiteAssets/LeaveForm/leave.js"), init);
    }, "sp.js");
})(_ || (_ = {}));
