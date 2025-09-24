/*2025.09.24 14:27 IMM*/

using System;

namespace ConsoleApplication1
{
    class BaseClass
    {
        public void BaseClassMethod() // Шаблонный метод
        {
            SomeMetod1();
            SomeMetod2();
        }

        public virtual void SomeMetod1() { Console.WriteLine("1"); }
        public virtual void SomeMetod2() { Console.WriteLine("2"); }
    }

    class DerivedClass : BaseClass
    {
        public new void SomeMetod1() { Console.WriteLine("3"); }        // перекрытие - замещение виртуального метода
        public override void SomeMetod2() { Console.WriteLine("4"); }   // переопределение, связка virtual->override, 1я форма полиморфизма
    }

    class Program
    {
        static void Main()
        {

            BaseClass instance = new DerivedClass();
            /*
            при апкасте (приведении к базовому типу) и замещении методов в производном классе (отсутствии полиморфизма)
            вторая форма классического принудительного полиморфизма берет верх (срабатывает) и происходит приведение к 
            базовому типу
            */
            instance.SomeMetod1();  // 1
            /*Первая форма классического принудительного полиморфизма доминирует над второй. Если убрать ключевые
            слова virtual и override, то будет не переопределение, а замещение, которое не является полиморфизмом.
            Соответственно после апкаста сработает метод базового класса.*/
            instance.SomeMetod2();  // 4

            instance.BaseClassMethod(); // 14

            // Delay
            Console.ReadKey();
        }
    }
}
