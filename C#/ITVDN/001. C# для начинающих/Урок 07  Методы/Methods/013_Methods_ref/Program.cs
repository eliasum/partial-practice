using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Methods
{
    class Program
    {
        // передается ссылка на исходные аргументы, копия не создается
        static void AddTwo(ref int a)
        {
            a = a + 2;
            Console.WriteLine("Значение int a = {0}", a);
        }
        static void Main(string[] args)
        {
            Console.WriteLine("Введите число");

            // принимаем ввод от пользователя и преобразуем его в целочисленное значение

            string number = Console.ReadLine();
            int result = Int32.Parse(number);

            Console.WriteLine("Значение result = {0}", result);

            // в качестве аргумента передается не сама переменная result, а ее копия

            AddTwo(ref result);
            Console.WriteLine("Значение result = {0}", result);

            // delay
            Console.ReadKey();

        }
    }
}
