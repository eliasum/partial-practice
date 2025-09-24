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
        // Без NEW срабатывает как с NEW - НО, предупреждение компилятора.
        public void SomeMetod1() { Console.WriteLine("3"); }            // перекрытие - замещение виртуального метода
        public override void SomeMetod2() { Console.WriteLine("4"); }   // переопределение, связка virtual->override, 1я форма полиморфизма
    }

    class DerivedFromDerivedClass : DerivedClass { }


    class Program
    {
        static void Main()
        {
            Console.WriteLine("BaseClass");

            BaseClass i1 = new DerivedClass();
            /*
            при апкасте (приведении к базовому типу) и замещении методов в производном классе (отсутствии полиморфизма)
            вторая форма классического принудительного полиморфизма берет верх (срабатывает) и происходит приведение к 
            базовому типу
            */
            i1.SomeMetod1();  // 1
            /*Первая форма классического принудительного полиморфизма доминирует над второй. Если убрать ключевые
            слова virtual и override, то будет не переопределение, а замещение, которое не является полиморфизмом.
            Соответственно после апкаста сработает метод базового класса.*/
            i1.SomeMetod2();  // 4


            Console.WriteLine("DerivedClass");

            // нет апкаста (приведения к базовому типу), поэтому сработают методы
            // производного класса независимо от их полиморфности
            DerivedClass i2 = new DerivedClass();
            i2.SomeMetod1();  // 3
            i2.SomeMetod2();  // 4


            Console.WriteLine("DerivedFromDerivedClass");

            DerivedFromDerivedClass i3 = new DerivedFromDerivedClass();
            i3.SomeMetod1();  // 3
            i3.SomeMetod2();  // 4

            // Delay
            Console.ReadKey();
        }
    }
}
