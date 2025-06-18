using System;

namespace Print
{
    enum Colors
    {
        Blue = 0,
        Red = 1,
        Green = 2
    }

    static class MyClass
    {
        public static void Print(string line, int color)
        {
            switch (color)
            {
                case (int)Colors.Blue:
                    Console.ForegroundColor = ConsoleColor.Blue;
                    break;
                case (int)Colors.Green:
                    Console.ForegroundColor = ConsoleColor.Green;
                    break;
                case (int)Colors.Red:
                    Console.ForegroundColor = ConsoleColor.Red;
                    break;
                default:
                    Console.WriteLine("Введенная Вами строка будет выведена на экран цветом по умолчанию!");
                    break;
            }

            Console.WriteLine(line);
        }
    }

    class Program
    {
        static void Main()
        {
            Console.WriteLine("Введите строку:");
            string line = Console.ReadLine();

            Console.WriteLine("Укажите цвет: ( 0-blue, 2-green, 1-red)");
            int color = Convert.ToInt32(Console.ReadLine());

            MyClass.Print(line, color);

            // Delay.
            Console.ReadKey();
        }
    }
}