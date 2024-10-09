using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _006_StaticCo
{
    class NotStaticClass
    {
        // если класс содержит статические поля, то должен быть предоставлен статический
        // конструктор, который инициализирует эти поля при загрузке класса

        private static int field;

        public static int Property
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

        // статический конструктор - не могут быть пользовательскими, но только по умолчанию
        // единственное назначение статических конструкторов - 
        // присваивать исходные значения статическим переменным
        static NotStaticClass()
        {
            Console.WriteLine("статический конструктор NotStaticClass()");
            field = 1;
        }

        public NotStaticClass()
        {
            Console.WriteLine("нестатический конструктор NotStaticClass()");
        }

        // статические методы могут быть перегружены
        public static void Method()
        {
            Console.WriteLine("статический метод нестатического класса NotStaticClass");
        }

        // статические методы могут быть перегружены
        public static void Method(int s)
        {
            Console.WriteLine("перегруженный статический метод нестатического класса NotStaticClass " + s);
        }

        // нестатический метод
        public void NotStaticMethod()
        {
            Console.WriteLine(field);
        }

    }

    class Program
    {
        static void Main(string[] args)
        {
            NotStaticClass instance = new NotStaticClass();
            instance.NotStaticMethod();
            
            NotStaticClass.Property = 2;
            Console.WriteLine(NotStaticClass.Property);

            NotStaticClass.Method();
            NotStaticClass.Method(3);
            
            Console.ReadKey();

        }
    }
}
