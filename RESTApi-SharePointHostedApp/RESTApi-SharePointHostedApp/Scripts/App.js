'use strict';
var hostWebUrl;
var appWebUrl;
var listName="Employee";

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage()
{
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
    $(document).ready(function () {
        getUserName();

        GetEmployeeDetails();

        $("#btnCreate").on('click', function () {
            createEmployee();
            ClearData();
        });
        $("#btnUpdate").on('click', function () {
            UpdateEmployee();
            ClearData();
        });

        $("#btnClear").on('click', function () {
            ClearData();
        });

        $("#btnGet").on('click', function () {
            $('#empName').val("");
            $("#empSalary").val("");
            $("#tblAddress").val("");
            $("#tblEmployees").empty();
            GetEmployeeDetailsByID();
        });

        $("#btnDelete").on('click', function () {
            deleteEmployee();
            ClearData();
        });
    });

    // This function prepares, loads, and then executes a SharePoint query to get the current users information
    function getUserName() {
        context.load(user);
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    }

    // This function is executed if the above call is successful
    // It replaces the contents of the 'message' element with the user name
    function onGetUserNameSuccess() {
        $('#message').text('Hello ' + user.get_title());
    }

    // This function is executed if the above call fails
    function onGetUserNameFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }
    function createEmployee() {
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify({
                "__metadata":
                {
                    "type": "SP.Data.EmployeeListItem"
                },
                "Title": $("#empName").val(),
                "Salary": $("#empSalary").val(),
                "Address": $("#empAddress").val()
            }),
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data, status, xhr) {
                $("#tblemployees").empty();
                GetEmployeeDetails();
                alert("Successfully submitted");
            },
            error: function (xhr, status, error) {
                alert(JSON.stringify(error));
            }
        });
    };
    function UpdateEmployee() {
        var id = $("#empID").val();
        $.ajax({
            url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items('"+id+"')",
            type: "POST",
            data: JSON.stringify({
                __metadata: { type: "SP.Data.EmployeeListItem" },
                Title: $("#empName").val(),
                Salary: $("#empSalary").val(),
                Address: $("#empAddress").val()
            }),
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            },
            success: function (data, status, xhr) {
                $("#tblEmployees").empty();
                GetEmployeeDetails();
                alert("Data updated successfully!");
            },
            error: function (xhr, status, error) {
                alert(JSON.stringify(error));
            }
        });
    };
    function GetEmployeeDetails() {
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,Title,Salary,Address",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {
                var table = $("#tblEmployees");
                var html = "<table><thead><tr><th>ID</th><th>Name</th><th>Salary</th><th>Address</th></tr></thead>";
                for (var i = 0; i < data.d.results.length; i++)
                {
                    var item = data.d.results[i];
                    //$("#tblEmployees").append(item.Title+"\t"+item.Salary+"\t"+item.Address+"<br/>");
                    html += "<tr><td>" + item.ID + "</td><td>" + item.Title + "</td><td>"+item.Salary+"</td><td>"+item.Address+"</td></tr>";
                }
                html += "</table>";
                table.html(html);
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    };
    function ClearData() {
        $("#empID").val("");
        $('#empName').val("");
        $("#empSalary").val("");
        $("#empAddress").val("");
    };
    function GetEmployeeDetailsByID() {
        var idValue = $("#empID").val();

        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items('" + idValue + "')",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {
                $("#empName").val(data.d.Title);
                $("#empSalary").val(data.d.Salary);
                $("#empAddress").val(data.d.Address);
                $("#tblEmployees").empty();
                GetEmployeeDetails();
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    };
    function deleteEmployee(){
        var id = $("#empID").val();

        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl+"/_api/web/lists/getbytitle('"+listName+"')/items('"+id+"')",
            type: 'POST',
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-METHOD":"DELETE"
            },
            success: function (data, status, xhr) {
                $("#tblEmployees").empty();
                GetEmployeeDetails();

                alert("Successfully record deleted");
            },
            eroor: function (xhr, status, error) {
                alert(JSON.stringify(error));
            }
        });
    }
    function manageQueryStringParameter(paramToRetrieve) {
        var params =
        document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve) {
                return singleParam[1];
            }
        }
    }
}
