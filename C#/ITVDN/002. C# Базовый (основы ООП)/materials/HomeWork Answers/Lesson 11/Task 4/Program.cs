using System;

namespace Task_4
{
    class Program
    {
        static void Main()
        {
            MyArrayList m = new MyArrayList();

            m.Add(5);
            m.Add("Hello");
            m.Add('d');
            m.Add(5.78);

            Console.WriteLine("Массив:");
            Console.WriteLine(m.ToString());

            // Delay.
            Console.ReadKey();
        }
    }
}
