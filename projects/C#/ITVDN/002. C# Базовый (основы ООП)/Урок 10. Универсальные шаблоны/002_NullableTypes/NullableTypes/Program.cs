/*2020.07.02 17:13 IMM*/

using System;

namespace NullableTypes
{
    class Program
    {
        static void Main()
        {
            // a - содержит неизвестное значение.
            /*
            null - значение по умолчанию для ссылочных типов
            int - структурный тип
            Создаем переменную a типа nullable type типа int и присваиваем ей
            значение null. 
            Использование синтаксиса со знаком ? можно присвоить
            переменной структурного типа значение null.
            */
            int? a = null;
            int? b = a + 4; // b = null
            int? c = a * 5; // c = null
            
            Console.WriteLine("->{0}<-", a); 

            // Delay.
            Console.ReadKey();
        }
    }
}
