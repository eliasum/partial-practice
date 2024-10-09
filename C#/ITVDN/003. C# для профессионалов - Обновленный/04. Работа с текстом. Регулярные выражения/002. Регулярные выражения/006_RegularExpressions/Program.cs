using System;
using System.Text.RegularExpressions;

// Регулярные выражения.

namespace RegularExpressions
{
    class Program
    {
        static void Main()
        {
            // | - символ для указания вариантов шаблона (ИЛИ). 
            string pattern = "test|str|aaaa";

            var array = new string[4];
            array[0] = "some text with test in it";
            array[1] = "some text with str in it";
            array[2] = "some text with aaaa in it";
            array[3] = "some text with nothing in it";

            // Создаем экземпляр класса Regex и передаем в качестве аргумента 
            //конструктора шаблон pattern.
            var regex = new Regex(pattern);

            /*
            public bool IsMatch(string input);
            Указывает, обнаружено ли в указанной входной строке соответствие регулярному
            выражению, заданному в конструкторе System.Text.RegularExpressions.Regex.
            */
            foreach (string element in array)
            {
                if (regex.IsMatch(element))
                    Console.WriteLine("Строка \"{0}\" соответствует шаблону \"{1}\"",
                        element, pattern);
                else
                    Console.WriteLine("Строка \"{0}\" НЕ соответствует шаблону \"{1}\"",
                        element, pattern);
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
