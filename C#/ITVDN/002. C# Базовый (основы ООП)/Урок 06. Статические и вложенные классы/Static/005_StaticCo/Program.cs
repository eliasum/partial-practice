using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _005_StaticCo
{
    class NotStaticClass
    {
        // статические поля readonly должны быть инициализированы в конструкторе или месте создания
        static readonly long readonlyField = 2;

        // статическое свойство только для чтения
        public static long ReadonlyField
        {
            get
            {
                return NotStaticClass.readonlyField;
            }
        }

        // статический конструктор
        static NotStaticClass()
        {
            readonlyField = 1;
        }

    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("статический конструктор");

            Console.WriteLine(NotStaticClass.ReadonlyField);

            Console.ReadKey();
        }
    }
}
