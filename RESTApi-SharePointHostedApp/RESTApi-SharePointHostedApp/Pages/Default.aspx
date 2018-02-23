<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>

    <%--<script type="text/javascript" src="_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="_layouts/15/sp.js"></script>--%>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    REST Api CRUD - SharePoint Hosted App
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div>
        <p id="message">
            <!-- The following content will be replaced with the user name when you run the app - see App.js -->
            initializing...
        </p>
    </div>

    <table class="centerTable">
        <tr>
            <td>
                <table>
                    <tr>
                        <td><span style="color: red; font: bold;"></span>ID </td>
                        <td>
                            <input type="text" id="empID" class="csValue" size="40" />
                        </td>
                    </tr>
                    <tr>
                        <td><span style="color: red; font: bold;"></span>EmployeeName </td>
                        <td>
                            <input type="text" id="empName" class="csValue" size="40" />
                        </td>
                    </tr>
                    <tr>
                        <td><span style="color: red; font: bold;"></span>Salary </td>
                        <td>
                            <input type="text" id="empSalary" class="csValue" size="40" />
                        </td>
                    </tr>
                    <tr>
                        <td><span style="color: red; font: bold;"></span>Address </td>
                        <td>

                            <textarea name="Text1" cols="40" rows="5" id="empAddress" class="csValue"></textarea>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
    <table>
        <tr>
            <td>
                <input type="button" value="Clear" id="btnClear" style="background-color: #4CAF50; border: none; color: white; padding: 7px 15px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin: 4px 2px; cursor: pointer;" />
            </td>
            <td>
                <input type="button" value="Submit" id="btnCreate" style="background-color: #4CAF50; border: none; color: white; padding: 7px 15px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin: 4px 2px; cursor: pointer;" />
            </td>
            <td>
                <input type="button" value="Update" id="btnUpdate" style="background-color: #4CAF50; border: none; color: white; padding: 7px 15px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin: 4px 2px; cursor: pointer;" />
            </td>
            <td>
                <input type="button" value="GetData" id="btnGet" style="background-color: #4CAF50; border: none; color: white; padding: 7px 15px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin: 4px 2px; cursor: pointer;" />
            </td>
            <td>
                <input type="button" value="Delete" id="btnDelete" style="background-color: #4CAF50; border: none; color: white; padding: 7px 15px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin: 4px 2px; cursor: pointer;" />
            </td>
        </tr>
    </table>
    <div id="tblEmployees"></div>
</asp:Content>
