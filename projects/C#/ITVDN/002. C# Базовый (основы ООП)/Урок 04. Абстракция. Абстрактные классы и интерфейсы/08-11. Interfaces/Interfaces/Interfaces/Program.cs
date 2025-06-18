using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// наследование абстрактных классов от интерфейсов

namespace Interfaces
{
    interface Interface
    {
        void Method();
    }

    abstract class AbstractClass : Interface
    {
        // реализация абстрактного метода из интерфейса в абстрактном классе НЕ обязательна
        public void Method()
        {
            Console.WriteLine("Метод - реализация интерфейса в абстрактном классе");
        }
    }

    class ConcreteClass : AbstractClass
    {

    }

    class Program
    {
        static void Main(string[] args)
        {
            ConcreteClass instance = new ConcreteClass();
            instance.Method();

            Console.ReadKey();
        }
    }
}
