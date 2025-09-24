/*2025.09.24 14:13 IMM*/

using System;

// Замещение.

namespace ConsoleApplication1
{
    class BaseClass
    {
        public void SomeMetod1() { Console.WriteLine("1"); }

        public void SomeMetod2() { Console.WriteLine("2"); }
    }

    class DerivedClass : BaseClass
    {
        //замещение методов
        public new void SomeMetod1() { Console.WriteLine("3"); }

        public void SomeMetod2() { Console.WriteLine("4"); }
    }

    class Program
    {
        static void Main()
        {
            /*
            при апкасте (приведении к базовому типу) и замещении методов в производном классе (отсутствии полиморфизма)
            вторая форма классического принудительного полиморфизма берет верх (срабатывает) и происходит приведение к 
            базовому типу
            */
            BaseClass instance1 = new DerivedClass();

            instance1.SomeMetod1();  // 1
            instance1.SomeMetod2();  // 2 

            // даункаст (приведение базового типа к производному), поэтому срабатывают методы из производного класса
            DerivedClass instance2 = instance1 as DerivedClass;

            instance2.SomeMetod1();  // 3
            instance2.SomeMetod2();  // 4

            // Delay
            Console.ReadKey();
        }
    }
}
