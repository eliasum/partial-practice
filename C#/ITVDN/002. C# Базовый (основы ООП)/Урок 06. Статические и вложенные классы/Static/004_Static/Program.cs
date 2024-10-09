using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _004_Static
{
    class NotStaticClass
    {
        // закрытое (по умолчанию) статическое поле
        static int field;

        // статическое свойство
        public static int Property // из статических членов мы не можем обращаться к нестатическим членам
        {
            get
            {
                return field;
            }

            set
            {
                field = value;
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            NotStaticClass.Property = 33;

            Console.WriteLine(NotStaticClass.Property);

            Console.ReadKey();
        }
    }
}
