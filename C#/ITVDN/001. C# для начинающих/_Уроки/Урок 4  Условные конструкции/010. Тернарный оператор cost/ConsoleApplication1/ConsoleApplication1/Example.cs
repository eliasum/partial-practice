using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class Example
    {
        static void Main(string[] args)
        {
            double quantity = 10;    // количество единиц товара
            double price = 100;      // цена за единицу товара
            double discount = 0.75;  // скидка на общую стоимость - 25%
            double cost;             // общая стоимость

            // ЕСЛИ: купили 10 единиц товара и больше, ТО: предоставить скидку в 25%, ИНАЧЕ: скидку не предоставлять
            cost = quantity >= 10 ? quantity * price * discount : quantity * price;

            Console.WriteLine("Общая стоимость товара составляет: {0} у. е.", cost);

            Console.ReadKey();
        }
    }
}