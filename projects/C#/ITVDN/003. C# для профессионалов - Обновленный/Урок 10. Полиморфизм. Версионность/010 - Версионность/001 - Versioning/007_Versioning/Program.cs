/*2025.09.24 14:35 IMM*/

using System;

namespace ConsoleApplication1
{
    class BaseClass
    {
        public virtual void SomeMetod1() { Console.WriteLine("1"); }
        public virtual void SomeMetod2() { Console.WriteLine("2"); }
    }

    class DerivedClass : BaseClass
    {
        public new void SomeMetod1() { Console.WriteLine("3"); }
        public override void SomeMetod2() { Console.WriteLine("4"); }
    }

    class Program
    {
        static void Main()
        {
            // нет апкаста (приведения к базовому типу), поэтому сработают методы
            // производного класса независимо от их полиморфности
            DerivedClass instance = new DerivedClass();

            instance.SomeMetod1();  // 3
            instance.SomeMetod2();  // 4

            // Delay
            Console.ReadKey();
        }
    }
}
