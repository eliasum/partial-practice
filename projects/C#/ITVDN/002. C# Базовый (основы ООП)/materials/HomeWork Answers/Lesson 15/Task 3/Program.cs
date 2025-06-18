using System;

namespace Task_3
{
    class Program
    {
        static void Main()
        {
            PriceTable priceTable = new PriceTable();

            for (int i = 0; i < 2; i++)
            {
                Console.WriteLine(priceTable[i]);
            }

            Console.WriteLine("Введите номер товара для поиска:");
            string product = Console.ReadLine();

            Console.WriteLine(priceTable[product]);

            // Delay.
            Console.ReadKey();
        }
    }
}
