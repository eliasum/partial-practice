using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// статические члены в абстрактных классах

namespace _008_Abstract
{
    // абстрактный класс
    abstract class AbstractClass
    {
        // статический фабричный метод
        /*
            открытый статический метод CreateObject(), возвращающий объект типа ConcreteClass 
            и приводящий его к типу AbstractClass
        */
        public static AbstractClass CreateObject()  
        {
            return new ConcreteClass();
        }

        // открытый абстрактный метод
        public abstract void Method();
    }

    class ConcreteClass : AbstractClass
    {
        public override void Method()
        {
            Console.WriteLine("Hello world!");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            AbstractClass instance = AbstractClass.CreateObject();

            instance.Method();

            Console.ReadKey();
        }
    }
}
