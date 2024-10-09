using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// Методы с выходными параметрами

namespace Methods
{
    class Program
    {
        // выходные параметры должны быть изменены в теле метода, иначе будет ошибка
        static int Method(out int a)
        {
            // закомментировать!
            a = 1;
            return 2;
        }
        static void Main(string[] args)
        {
            int operand;

            // out - позволяет передавать в метод непроинициализированные переменные 

            int result = Method(out operand);

            Console.WriteLine("{0}; {1};", operand, result);

            // delay
            Console.ReadKey();

        }
    }
}
