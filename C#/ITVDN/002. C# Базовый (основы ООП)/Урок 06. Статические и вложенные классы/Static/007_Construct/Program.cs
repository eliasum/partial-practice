using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _006_StaticCo
{
    class NotStaticClass
    {
        // статический конструктор - не могут быть пользовательскими, но только по умолчанию
        // единственное назначение статических конструкторов - 
        // присваивать исходные значения статическим переменным
        // вызывается в любом случае
        static NotStaticClass()
        {
            Console.WriteLine("статический конструктор NotStaticClass()");
        }

        // конструктор экземпляра - вызывается только при создании экземпляра класса
        public NotStaticClass()
        {
            Console.WriteLine("нестатический конструктор NotStaticClass()");
        }

        // нестатический метод
        public void NotStaticMethod()
        {
            Console.WriteLine("нестатический метод NotStaticClass()");
        }

        // статический метод
        public static void StaticMethod()
        {
            Console.WriteLine("статический метод NotStaticClass()");
        }

    }

    class Program
    {
        static void Main(string[] args)
        {
            // 1. вызывается только статический конструктор
            //NotStaticClass.StaticMethod();

            // 2. Вызывается оба конструктора
            NotStaticClass inst = new NotStaticClass();
            inst.NotStaticMethod();

            Console.ReadKey();

        }
    }
}
