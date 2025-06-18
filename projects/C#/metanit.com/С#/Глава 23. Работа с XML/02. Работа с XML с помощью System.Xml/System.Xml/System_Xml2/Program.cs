/*2021.08.09 14:46 IMM*/

using System;
using System.Collections.Generic;
using System.Xml;

// Подобным образом мы можем создать объекты User по данным из xml:

namespace System_Xml2
{
    class User
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public string Company { get; set; }
    }
    class Program
    {
        static void Main(string[] args)
        {
            List<User> users = new List<User>();

            XmlDocument xDoc = new XmlDocument();
            xDoc.Load(@"users.xml");

            XmlElement xRoot = xDoc.DocumentElement;

            foreach (XmlElement xnode in xRoot)
            {
                User user = new User();

                XmlNode attr = xnode.Attributes.GetNamedItem("name");

                if (attr != null)
                    user.Name = attr.Value;

                foreach (XmlNode childnode in xnode.ChildNodes)
                {
                    if (childnode.Name == "company")
                        user.Company = childnode.InnerText;

                    if (childnode.Name == "age")
                        user.Age = Int32.Parse(childnode.InnerText);
                }
                users.Add(user);
            }
            foreach (User u in users)
                Console.WriteLine($"{u.Name} ({u.Company}) - {u.Age}");
            Console.Read();
        }
    }
}
