using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// возврат значений из метода main()

// перегрузка метода main() допустима

// точкой входа в программу может быть метод main(), который возвращает значение типа void или int

namespace Methods
{
    class Program
    {
        // перегрузка (не является точкой входа)

        static string Main(string argument)
        {
            return "Hello " + argument + "!";
        }
        
        // точка входа в программу
        static void Main(string[] args)
        {
            string @string = Main("World");

            Console.WriteLine(@string);

            Console.ReadKey();
        }
    }
}
