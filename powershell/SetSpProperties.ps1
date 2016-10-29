Connect-SPOnline https://gandjustas.sharepoint.com/sites/dev -Credentials vnextsoft

$list = Get-SPOList -Identity /lists/leaverequests
Get-SPOProperty -ClientObject $list -Property ContentTypes
$ct = $list.ContentTypes[0]
$ct.JSLink = "~site/SiteAssets/LeaveForm/tstmpl.js|~site/SiteAssets/LeaveForm/leave.js"
$ct.Update($false)
Execute-SPOQuery

