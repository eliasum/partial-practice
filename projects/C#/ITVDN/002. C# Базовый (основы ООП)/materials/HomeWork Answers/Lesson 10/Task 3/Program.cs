using System;

namespace Task_3
{
    class Program
    {
        static void Main()
        {
            Console.WriteLine("Введите размерность словаря:");
            int n = Convert.ToInt32(Console.ReadLine());

            var dictionary = new MyDictionary<string, string>(n);

            for (int i = 0; i < n; i++)
            {
                dictionary.Add(i, "стол", "table");
            }

            Console.WriteLine(new string('-', 20));

            for (int i = 0; i < n; i++)
            {
                Console.WriteLine(dictionary[i]);
            }

            Console.WriteLine(dictionary[1]);
            Console.WriteLine(dictionary.Lenght);

            // Delay.
            Console.ReadKey();
        }
    }
}
