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

            Console.WriteLine(instance.publicField);

            Console.ReadKey();
        }
    }
}
