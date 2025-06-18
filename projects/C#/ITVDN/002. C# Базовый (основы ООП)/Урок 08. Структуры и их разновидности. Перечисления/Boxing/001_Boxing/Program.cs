using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// упаковка и распаковка
// упаковка (boxing) - преобразование структурного типа (типа значения) в ссылочный тип (object)
// распаковка (unboxing) - преобразование ссылочного типа в структурный тип.

namespace _001_Boxing
{
    class Program
    {
        static void Main(string[] args)
        {
            short a = 25;

            // упаковка переменной а (boxing)
            object o = a;  // преобразуем структурный тип в ссылочный

            // распаковка объекта (unboxing)
            short b = (short)a;
        }
    }
}
