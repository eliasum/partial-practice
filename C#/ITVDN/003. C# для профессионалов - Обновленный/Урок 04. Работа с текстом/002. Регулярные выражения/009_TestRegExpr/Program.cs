/*2024.11.19 18:04 IMM*/

using System;
using System.Text.RegularExpressions;

namespace TestRegExpr
{
    class Program
    {
        static void Main()
        {           
            while (true)
            {
                Console.Write("Введите шаблон     : "); // Например: \d 
                string pattern = Console.ReadLine();

                Console.Write("Введите выражение  : "); // Например: 123
                string text = Console.ReadLine();

                /*
                Метод public bool IsMatch(string input);
                Указывает, обнаружено ли в указанной входной строке соответствие 
                регулярному выражению, заданному в конструкторе 
                System.Text.RegularExpressions.Regex.

                Метод public MatchCollection Matches(string input); ищет в указанной
                входной строке все вхождения регулярного выражения.
                */
                if (Regex.IsMatch(text, pattern))
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("OK.");
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.Beep();
                    Console.WriteLine("NO.");
                }

                Console.ForegroundColor = ConsoleColor.Gray;
            }
        }
    }
}
