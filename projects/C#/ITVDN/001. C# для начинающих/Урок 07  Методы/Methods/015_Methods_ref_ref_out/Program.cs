using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _015_Methods_ref_ref_out
{
    class Program
    {
        static void Add(int x, int y, out int sum)
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

            int sum;

            Add(summand1, summand2, out sum);

            Console.WriteLine("{0}+{1}={2}", summand1, summand2, sum); 

            Console.ReadKey();
        }
    }
}
