using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// Наследование.

// Наследование - механизм ООП, позволяющий описать новый (произвольный) класс
// на основе уже существующего (базового), при этом свойства и функциональность 
// базового класса заимствуются новым производным классом.

// Базовый класс            -           Производный класс
// Супер класс              -           Подкласс (сабкласс)
// Родительский класс       -           Дочерний класс
// Родитель                 -           Потомок

namespace Inheritance
{
    class Program
    {
        static void Main(string[] args)
        {
            DerivedClass instance = new DerivedClass();

            instance.field1 = 1;
            instance.field2 = 2;
            instance.field3 = 3;

            instance.field4 = 4;
            instance.field5 = 5;

            // приведение экземпляра класса DerivedClass к базовому типу BaseClass 
            BaseClass newInstance = (BaseClass)instance;  // upcast - приведение к базовому типу

            Console.WriteLine(newInstance.field1);
            Console.WriteLine(newInstance.field2);
            Console.WriteLine(newInstance.field3);

            //Console.WriteLine(newInstance.field4);
            //Console.WriteLine(newInstance.field5);

            // проверка
            Console.WriteLine("instance Id    {0}", instance.GetHashCode());
            Console.WriteLine("newInstance Id {0}", newInstance.GetHashCode());

            Console.ReadKey();
        }
    }
}
