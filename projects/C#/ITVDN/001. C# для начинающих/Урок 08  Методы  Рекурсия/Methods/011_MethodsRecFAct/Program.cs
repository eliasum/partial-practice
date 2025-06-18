using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MethodsRecFAct
{
    class Program
    {
        static int Factorial(int n)
        {
            if (n == 0) return 1;
            else return n * Factorial(n - 1);
        }
        static void Main(string[] args)
        {
            int factorial = Factorial(5);

            Console.WriteLine(factorial);

            Console.ReadKey();
        }
    }
}
