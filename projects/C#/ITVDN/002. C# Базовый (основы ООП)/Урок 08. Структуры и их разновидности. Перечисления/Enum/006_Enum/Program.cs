using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// перечисления. получение инфо о типе элементов перечисления

namespace _006_Enum
{
    class Program
    {
        // EnumType - имя перечисления
        enum EnumType : byte    // явно указываем использовать тип byte
        {
            zero = 0,
            one = 1,
            two = 2,
            three = 3,
            ten = 10
        }

        static void Main(string[] args)
        {
            EnumType digit = EnumType.ten;
            Console.WriteLine(digit);       // вывод имени константы перечисления

            Type @enum = digit.GetType(); // возвращает объект Type для текущего экземпляра
            Console.WriteLine(@enum);

            Type @const = Enum.GetUnderlyingType(@enum); // возвращает базовый тип заданного перечисления
            Console.WriteLine(@const);

            // или так:

            Console.WriteLine(typeof(EnumType)); // возвращает объект Type для текущего экземпляра
            Console.WriteLine(Enum.GetUnderlyingType(typeof(EnumType)));    // возвращает базовый тип заданного перечисления

            Console.ReadKey();
        }
    }
}
