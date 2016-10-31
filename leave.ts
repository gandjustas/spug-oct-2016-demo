declare function GoBack();

module _ {
    function isEdit (ctx:SPClientTemplates.RenderContext) {
        return ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm 
            || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm;
    }

    function disableField(fld: SPClientTemplates.FieldSchema_InForm, ctx:SPClientTemplates.RenderContext)
    {
        if(isEdit(ctx)) {
            CSR.getControl(fld).disabled = true;
        } 
    }

    function init() {
        var isApproved = false;
        CSR.override()
            .computedValue("Title", (t) => t + " " + (<any>_spPageContextInfo).userDisplayName, "LeaveType")            
            .onPostRenderField("Title", disableField)
            .onPostRenderField("LeaveApproved", disableField)
            .onPostRenderField("LeaveApproved", (fld, ctx:SPClientTemplates.RenderContext_Form) => {
                    var isApproved = ctx.ListData.Items[0]["LeaveApproved"] === "1";
                    if(isApproved && isEdit(ctx))
                    {
                        GoBack();  
                    }
            })
            .register();        
    }

    SP.SOD.executeOrDelayUntilScriptLoaded(init, "sp-ts-csr.ts");

    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/SiteAssets/LeaveForm/leave.js"), init);
    }, "sp.js");
} 