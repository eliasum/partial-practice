using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// абстрактный класс может быть унаследован от конкретного класса

namespace Abstraction
{
    // конкретный класс А
    class ConcreteClassA
    {
        public void Operation()
        {
            Console.WriteLine("ConcreteClassA.Operation");
        }
    }

    // абстрактный класс
    abstract class AbstractClass : ConcreteClassA
    {
        public abstract void Method();
    }

    // конкретный класс B
    class ConcreteClassB : AbstractClass
    {
        public override void Method()
        {
            Console.WriteLine("ConcreteClassB.Method");
        }
    }


    class Program
    {
        static void Main(string[] args)
        {
            // Создаем экземпляр класса ConcreteClassB, который приводится к классу AbstractClass
            AbstractClass instance = new ConcreteClassB();

            instance.Method();

            instance.Operation();

            Console.ReadKey();       
        }
    }
}
