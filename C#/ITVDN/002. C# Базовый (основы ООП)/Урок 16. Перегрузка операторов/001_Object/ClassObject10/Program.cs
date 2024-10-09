/*2022.10.07 15:21 IMM*/
using System;

// Базовый класс Object.

namespace ClassObject
{
    class MyBaseClass
    {
        public static string CompanyName = "Microsoft";
        public int age;
        public string name;
    }

    class MyDerivedClass : MyBaseClass
    {
        static void Main()
        {
            MyDerivedClass original = new MyDerivedClass();
            original.age = 42;
            original.name = "Alex";

            Console.WriteLine(original.age + " " + original.name + " " + MyDerivedClass.CompanyName);

            // Клонирование.
            /*
                MyDerivedClass clone = original; - поверхностное клонирование
                MyDerivedClass clone = original.MemberwiseClone() as MyDerivedClass; - глубокое клонирование
            */
            MyDerivedClass clone = original.MemberwiseClone() as MyDerivedClass;
            Console.WriteLine(clone.age + " " + clone.name + " " + MyDerivedClass.CompanyName + "\n");

            // Проверка. 
            clone.age = 23;
            clone.name = "Konstantin";
            MyBaseClass.CompanyName = "CyberBionic Systematics";

            Console.WriteLine(original.age + " " + original.name + " " + MyDerivedClass.CompanyName);
            Console.WriteLine(clone.age + " " + clone.name + " " + MyDerivedClass.CompanyName);
            
            // Delay.
            Console.ReadKey();
        }
    }
}
