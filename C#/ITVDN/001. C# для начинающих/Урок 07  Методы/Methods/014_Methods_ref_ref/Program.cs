using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Methods
{
    class Program
    {
        /*
        static void Add(int x, int y, ref int sum)
        {
            sum = x + y;
        }

        static void Main(string[] args)
        {
            Console.WriteLine("Введите первое число");

            string operand1 = Console.ReadLine();
            int summand1 = Int32.Parse(operand1);

            Console.WriteLine("Введите второе число");

            string operand2 = Console.ReadLine();
            int summand2 = Int32.Parse(operand2);

            int sum = 0;

            Add(summand1, summand2, ref sum);

            Console.WriteLine("{0}+{1}={2}", summand1, summand2, sum);  // ошибка

            Console.ReadKey();
        }
        */
        static int Add(int x, int y)
        {
            return x + y;
        }

        static void Main(string[] args)
        {
            Console.WriteLine("Введите первое число");
            int summand1 = Int32.Parse(Console.ReadLine());

            Console.WriteLine("Введите второе число");
            int summand2 = Int32.Parse(Console.ReadLine());

            int sum = Add(summand1, summand2);

            Console.WriteLine("{0}+{1}={2}", summand1, summand2, sum);

            Console.ReadKey();
        }
    }
}
