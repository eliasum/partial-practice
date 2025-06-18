using System;

namespace Lessons_3
{
    class Program
    {
        static void Main()
        {
            ColorPrinter print = new ColorPrinter(ConsoleColor.Yellow);
            print.Print("Hello");

            Printer printUp = print;
            printUp.Print("Hello");

            ColorPrinter print1 = new ColorPrinter(ConsoleColor.Red);
            print1.Print("Hello");
           
            // Delay.
            Console.ReadKey();
        }
    }
}
