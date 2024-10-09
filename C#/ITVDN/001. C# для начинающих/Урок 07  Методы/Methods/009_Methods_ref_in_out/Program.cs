using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// Методы с изменяемыми параметрами (ref = in/out)

namespace Methods
{
    class Program
    {
        // Если в теле метода выполнится изменение значения переменной, переданной по ссылке,
        // её значение будет изменено везде.
        static int Method(ref int a)
        {
            int b = a * 2;
            a = 5;
            return b;   
        }
        static void Main(string[] args)
        {
            int operand = 2;

            int result = Method(ref operand);

            Console.WriteLine("{0}; {1};", operand, result);

            // delay
            Console.ReadKey();

        }
    }
}
