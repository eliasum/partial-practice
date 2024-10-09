using System;

namespace Task_3
{
    class Program
    {
        static void Main()
        {
            var dictionary = new MyDictionary<string, string>(5);

            dictionary.Add(0, "стол",      "table");
            dictionary.Add(1, "яблоко",    "aplle");
            dictionary.Add(2, "карандаш",  "pencil");
            dictionary.Add(3, "солнце",    "sun");
            dictionary.Add(4, "блокнот",   "notepad");

            foreach (var item in dictionary)
            {
                Console.WriteLine(item);
            }

            Console.WriteLine(new string('-', 20));
            Console.WriteLine("Вторая запись в словаре:");
            Console.WriteLine(dictionary[1]);
            Console.WriteLine(new string('-', 20));
            Console.WriteLine("Размер словаря:");
            Console.WriteLine(dictionary.Lenght + " слов");
            Console.WriteLine(new string('-', 50));

            // Delay.
            Console.ReadKey();
        }
    }
}
