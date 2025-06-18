using System;

namespace Task_4
{
    class Program
    {
        static void Main()
        {
            Invoice inv = new Invoice(678904, "Alex", "Foxtrot") {Article = "USB-hab", Quantity = 6};

            inv.CostCalculation(true);
            inv.CostCalculation(false);

            Console.ReadKey();
        }
    }
}
