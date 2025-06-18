using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstraction
{
    abstract class AbstractClass
    {
        // конструктор (отрабатывает первым)
        public AbstractClass()
        {
            Console.WriteLine("1 AbstractClass()");

            // вызывается реализация метода из производного класса ConcreteClass
            this.AbstractMethod();

            Console.WriteLine("2 AbstractClass()");
        }
        public abstract void AbstractMethod();
    }

    class ConcreteClass : AbstractClass
    {
        string s = "FIRST";

        // конструктор (отрабатывает вторым)
        public ConcreteClass()
        {
            Console.WriteLine("3 ConcreteClass()");

            s = "SECOND";
        }

        public override void AbstractMethod()
        {
            Console.WriteLine("Реализация абстрактного метода AbstractMethod() в ConcreteClass {0}", s);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // создаем экземпляр класса ConcreteClass, который приводится к типу AbstractClass
            AbstractClass instance = new ConcreteClass();

            Console.WriteLine(new string('-',55));

            instance.AbstractMethod();

            Console.ReadKey();
        }
    }
}
