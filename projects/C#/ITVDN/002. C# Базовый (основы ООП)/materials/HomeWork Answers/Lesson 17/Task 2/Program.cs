using System;
using System.Collections.Generic;

namespace Task_2
{
    class Program
    {
        static void Main()
        {
            var listAuto = new List<Auto>
                               {
                                   new Auto("Fiat", "Bravo", 2005, "red"),
                                   new Auto("Mersedes", "E", 2010, "black"),
                                   new Auto("Skoda", "Fabia", 2009, "yellow"),
                                   new Auto("Mersedes","A", 2009, "grey")
                               };

            foreach (var auto in listAuto)
            {
                Console.WriteLine(auto.ToString());
            }

            Console.WriteLine(new string('-', 30));

            var listCustomer = new List<Customer>
                                   {
                                       new Customer( "Petrov","Mersedes", "0509864578"),
                                       new Customer( "Ivanov", "Fiat", "0509876545"),
                                       new Customer( "Vasiliev", "Skoda", "0504789863")
                                   };

            foreach (var customer in listCustomer)
            {
                Console.WriteLine(customer.ToString());
            }

            Console.WriteLine(new string('-', 30));

            var query = from auto in listAuto
                        select new { Marka = auto.Marka, Color = auto.Color };

            foreach (var item in query)
            {
                Console.WriteLine("Марка авто: {0}  - {1}", item.Marka, item.Color);
            }

            Console.WriteLine(new string('-', 30));

            var query1 = from customer in listCustomer
                         join auto in listAuto on customer.Model equals auto.Marka
                         select new
                         {
                             Name = customer.Name,
                             Tel = customer.Tel,
                             Model = customer.Model,
                             Color = auto.Color,
                             Marka = auto.Model,
                             Year = auto.Year
                         };

            Console.WriteLine(new string('-', 30));

            foreach (var item in query1)
            {
                Console.WriteLine("{0} {1} {2} {3} {4} {5}", item.Name, item.Tel, item.Model, item.Marka, item.Color, item.Year);
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
