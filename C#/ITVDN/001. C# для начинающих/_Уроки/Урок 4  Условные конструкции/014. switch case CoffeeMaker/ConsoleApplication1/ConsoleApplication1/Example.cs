using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class Example
    {
        static void Main(string[] args)
        {
            // предлагаем пользователю выбрать напиток.
            Console.WriteLine("Размеры стаканчиков кофе: 1 = Маленький, 2 = Средний, 3 = Большой");
            Console.Write("Пожалуйста, сделайте свой выбор: ");

            // принимаем ввод от пользователя:
            string coffeeSize = Console.ReadLine();

            int cost = 0;

            // если оператор case имеет в своём теле код, то не поддерживается проваливание
            // для организации проваливания можно исп-ть оператор безусловного перехода goto
            switch (coffeeSize)
            { 
                case "1":
                    cost += 25;
                    break;
                case "2":
                    cost += 25;
                    goto case "1";
                case "3":
                    cost += 50;
                    goto case "1";
                default:
                    Console.WriteLine("Неверный выбор. Пожалуйста, выберите 1, 2 или 3.");
                    break;
            }

            if (cost != 0)
            {
                Console.WriteLine("Внесите {0} копеек", cost);
            }
            else
            {
                Console.Write("Пожалуйста, повторите выбор.");
            }

            Console.ReadKey();
        }
    }
}