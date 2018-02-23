'use strict';
/*Custom code starts*/
var hostWebUrl;
var appWebUrl;
var listItemId, listItemToUpdate;

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
    $(document).ready(function () {
        getUserName();
        hostWebUrl = decodeURIComponent(manageQueryStringParameter('SPHostUrl')); //need to replace the SPHostUrl
        appWebUrl = decodeURIComponent(manageQueryStringParameter('SPAppWebUrl')); //need to replace the SPAppWebUrl        
        //Or it cn be
        //hostWebUrl = _spPageContextInfo.siteAbsoluteUrl;
        //appWebUrl = _spPageContextInfo.webAbsoluteUrl;
        //var ctx = new SP.ClientContext(appWebUrl);
        //var web = ctx.get_web();    
        listAllCategories();

        $("#btn-new").on('click', function () {
            $(".c1").val('');
        });
        $("#btn-add").on('click', function () {
            createCategory();
            listAllCategories();
        });
        $("#btn-update").on('click', function () {
            updateItem();
            listAllCategories();
        });
        $("#btn-find").on('click', function () {
            findListItem();
        });
        $("#btn-delete").on('click', function () {
            deleteListItem();
            listAllCategories();
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
}


function manageQueryStringParameter(paramToRetrieve) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i++) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}
function listAllCategories() {
    var ctx = new SP.ClientContext(appWebUrl);
    var appCtxSite = new SP.AppContextSite(ctx, hostWebUrl);
    var web = appCtxSite.get_web();
    var list = web.get_lists().getByTitle("Category List");

    var query = new SP.CamlQuery();
    query.set_viewXml('<View><RowLimit>10</RowLimit></View>');
    var items = list.getItems(query);

    ctx.load(list);
    ctx.load(items);

    var table = $('#tblcategories');
    var innerHtml = "<tr><td>ID</td><td>Category Id</td><td>Category Name</td></tr>";
    ctx.executeQueryAsync(
        Function.createDelegate(this, function () {
            var itemInfo = '';
            var enumerator = items.getEnumerator();
            while (enumerator.moveNext()) {
                var curItem = enumerator.get_current();
                innerHtml += "<tr><td>" + curItem.get_item('ID') + "</td><td>" + curItem.get_item('CategoryId') + "</td><td>" + curItem.get_item('Title') + "</td></tr>";
            }
            table.html(innerHtml);
        }),
        Function.createDelegate(this, fail)
    );
}
function createCategory() {
    var ctx = new SP.ClientContext(appWebUrl);
    var appCtxSite = new SP.AppContextSite(ctx, hostWebUrl);

    var web = appCtxSite.get_web();
    var list = web.get_lists().getByTitle('Category List');
    var listItemCreationInformation = new SP.ListItemCreationInformation();
    var listItem = list.addItem(listItemCreationInformation);

    listItem.set_item("CategoryId", $("#CategoryId").val());
    listItem.set_item("Title", $("#CategoryName").val());
    listItem.update();

    ctx.load(listItem);
    ctx.executeQueryAsync(Function.createDelegate(this, success), Function.createDelegate(this, fail));
}
function findListItem() {
    listItemId = prompt("Enter the Id to be Searched ");
    var ctx = new SP.ClientContext(appWebUrl);
    var appCtxSite = new SP.AppContextSite(ctx, hostWebUrl);

    var web = appCtxSite.get_web();
    var list = web.get_lists().getByTitle('Category List');
    ctx.load(list);

    listItemToUpdate = list.getItemById(listItemId);
    ctx.load(listItemToUpdate);
    ctx.executeQueryAsync(Function.createDelegate(this, function () {
        $("#CategoryId").val(listItemToUpdate.get_item('CategoryId'));
        $("#CategoryName").val(listItemToUpdate.get_item('Title'));
    }),
    Function.createDelegate(this, fail));
}
function updateItem() {
    var ctx = new SP.ClientContext(appWebUrl);
    var appCtxSite = new SP.AppContextSite(ctx, hostWebUrl);

    var web = appCtxSite.get_web();
    var list = web.get_lists().getByTitle('Category List');
    ctx.load(list);

    listItemToUpdate = list.getItemById(listItemId);
    ctx.load(listItemToUpdate);

    listItemToUpdate.set_item('Title', $("#CategoryName").val());
    listItemToUpdate.update();
    ctx.executeQueryAsync(
        Function.createDelegate(this, success),
        Function.createDelegate(this, fail)
        );
}
function deleteListItem() {
    var ctx = new SP.ClientContext(appWebUrl);
    var appCtxSite = new SP.AppContextSite(ctx, hostWebUrl);

    var web = appCtxSite.get_web();
    var list = web.get_lists().getByTitle('Category List');
    ctx.load(list);

    listItemToUpdate = list.getItemById(listItemId);
    ctx.load(listItemToUpdate);
    listItemToUpdate.deleteObject();

    ctx.executeQueryAsync(
        Function.createDelegate(this, success),
        Function.createDelegate(this, fail)
        );
}
function success() {
    $("#dvMessage").text("Operation Completed Successfully");
}
function fail() {
    $("#dvMessage").text("Operation failed  " + arguments[1].get_message());
}
