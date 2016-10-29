Connect-SPOnline https://gandjustas.sharepoint.com/sites/dev -Credentials vnextsoft
if (!(Test-Path ./package)) {
    New-Item ./package -ItemType Directory
}
Convert-SPOFolderToProvisioningTemplate -Folder ./template -Out ./package/template.pnp