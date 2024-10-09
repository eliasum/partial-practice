using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// абстрактый класс может быть унаследован от абстрактного класса
// реализация абстрактного метода из базового абстрактного класса в производном абстрактном классе необязательна

namespace Abstraction
{
    // абстрактный класс А
    abstract class AbstractClassA
    {
        public abstract void OperationA();
    }

    // абстрактный класс В
    abstract class AbstractClassB : AbstractClassA
    {
        public abstract void OperationB();
    }

    // конкретный класс
    class ConcreteClass : AbstractClassB
    {
        public override void OperationA()
        {
            Console.WriteLine("ConcreteClass.OperationA");
        }

        public override void OperationB()
        {
            Console.WriteLine("ConcreteClass.OperationB");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // создаем экземпляр класса ConcreteClass и приводим его к типу AbstractClassA
            AbstractClassA instance = new ConcreteClass();

            instance.OperationA();

            //instance.OperationB();

            Console.ReadKey();



        }
    }
}
