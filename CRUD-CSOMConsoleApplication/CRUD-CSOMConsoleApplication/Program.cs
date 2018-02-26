using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security;
using System.Text;
using System.Threading.Tasks;


namespace CRUD_CSOMConsoleApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            string siteUrl = "https://sharmadev1.sharepoint.com/sites/intranetbook/";
            string username = "heema@sharmadev1.onmicrosoft.com";
            string password = "sharma99!";
            string listName = "Employee";
            Web web;

            using (ClientContext clientContext = new ClientContext(siteUrl))
            {
                SecureString passWord = new SecureString();
                foreach (char c in password.ToCharArray())
                    passWord.AppendChar(c);

                clientContext.Credentials = new SharePointOnlineCredentials(username, passWord);

                web = clientContext.Web;
                /*List all lists : starts*/
                GetAllLists(web,clientContext);
                /*List all lists : ends*/

                //Get List Item
                //GetListItem(web, clientContext, listName);

                //Insert an item
                //InsertListItem(web,clientContext,listName);

                //Update an item
                //UpdateListItem(web, clientContext, listName);

                //delete an item
                //DeleteListItem(web, clientContext, listName);
                Console.ReadLine();
            }
        }
        public static void GetAllLists(Web web,ClientContext clientContext)
        {
            ListCollection listColl = web.Lists;

            clientContext.Load(listColl);
            clientContext.ExecuteQuery();

            foreach (List list in listColl)
            {
                Console.WriteLine("ListName: " + list.Title + "; ID: " + list.Id);
            }
        }
        public static void GetListItem(Web web, ClientContext clientContext, string listName)
        {
            List list = clientContext.Web.Lists.GetByTitle(listName);

            CamlQuery query = new CamlQuery();
            query.ViewXml = "<View/>";

            ListItemCollection items = list.GetItems(query);

            clientContext.Load(list);
            clientContext.Load(items);
            clientContext.ExecuteQuery();

            foreach(ListItem item in items)
            {
                Console.WriteLine(item.Id + "-"+item["Title"]+" Salary-"+item["Salary"]+" Address-"+item["Address"]);
            }
        }
        private static void InsertListItem(Web web, ClientContext clientContext, string listName)
        {
            List list = clientContext.Web.Lists.GetByTitle(listName);

            ListItemCreationInformation newItem = new ListItemCreationInformation();
            ListItem listItem = list.AddItem(newItem);
            listItem["Title"] = "Heema Sharma";
            listItem["Salary"] = "5000";
            listItem["Address"] = "Khambhat";
            listItem.Update();
            clientContext.ExecuteQuery();
            Console.WriteLine("Item inserted successfully!");
        }
        private static void UpdateListItem(Web web, ClientContext clientContext, string listName)
        {
            List list = clientContext.Web.Lists.GetByTitle(listName);

            ListItem oListItem = list.GetItemById(5);

            oListItem["Address"] = "new updated address";
            oListItem.Update();
            clientContext.ExecuteQuery();
            Console.WriteLine("Item updated successfully.");
        }
        private static void DeleteListItem(Web web, ClientContext clientContext, string listName)
        {
            List list = clientContext.Web.Lists.GetByTitle(listName);

            ListItem oListItem = list.GetItemById(5);
            oListItem.DeleteObject();

            clientContext.ExecuteQuery();
            Console.WriteLine("Item deleted successfully.");
        }
    }
}
