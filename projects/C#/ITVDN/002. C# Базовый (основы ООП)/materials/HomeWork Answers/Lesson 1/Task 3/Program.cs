using System;

namespace Task_3
{
    class Program
    {
        static void Main()
        {
            string content = "In this chapter, I will introduce information that is fundamental to"+
                                   " working with types and the common language runtime (CLR).";

            Book book = new Book("CLR via C#", "Jeffrey Richter", content);           
            
            book.Show();

            // Delay.
            Console.ReadKey();
        }
    }
}
