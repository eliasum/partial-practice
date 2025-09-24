/*2025.09.24 14:58 IMM*/

using System;

namespace ConsoleApplication1
{
    class BaseClass
    {
        //NVI - (Non-Virtual Interface) Невиртуальный Интерфейс - создание шаблонного метода с виртуальными методами внутри
        public virtual void SomeMethods()   // virtual шаблонный метод
        {
            SomeMetod1();
            SomeMetod2();
        }

        public virtual void SomeMetod1() { Console.Write("1."); }
        public virtual void SomeMetod2() { Console.Write("2."); }
    }

    class DerivedClass : BaseClass
    {
        public new void SomeMethods()   // перекрытый шаблонный метод - замещение виртуального шаблонного метода из базового класса
        {
            SomeMetod1();
            SomeMetod2();
        }

        public new void SomeMetod1() { Console.Write("3."); }       // перекрытие - замещение виртуального метода
        public override void SomeMetod2() { Console.Write("4."); }  // переопределение, связка virtual->override, 1я форма полиморфизма
    }

    class Program
    {
        static void Main()
        {
            while (true)
            {
                Console.Write("Введите ключ - 0, 1 или 2: ");
                string s = Console.ReadLine();

                if (s == "0") // Версия: 1.2
                    new BaseClass().SomeMethods();

                if (s == "1") // Версия: 1.4
                    (new DerivedClass() as BaseClass).SomeMethods();

                if (s == "2") // Версия: 3.4                
                    new DerivedClass().SomeMethods();

                Console.WriteLine("\n");
            }
        }
    }
}
