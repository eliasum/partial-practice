using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstraction
{
    class Program
    {
        // абстрактый класс
        abstract class AbstractClass
        {
            public abstract void Method();
        }

        // конкретный класс
        class ConcreteClass : AbstractClass
        {
            public override void Method()
            {
                Console.WriteLine("Implementation");
            }
        }

        static void Main(string[] args)
        {
            AbstractClass instance = new ConcreteClass();

            instance.Method();

            Console.ReadKey();
        }
    }
}
