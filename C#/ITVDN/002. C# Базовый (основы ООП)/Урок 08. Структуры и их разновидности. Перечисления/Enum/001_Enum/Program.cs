using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _001_Enum
{
    class Program
    {
        // EnumType - имя перечисления
        enum EnumType : byte    // явно указываем использовать тип byte
        {
            zero = 0,
            one = 1,
            two = 2,
            three = 3
        }

        static void Main(string[] args)
        {
            Console.WriteLine(EnumType.one);        // имя константы перечисления
            Console.WriteLine((byte)EnumType.one);  // значение константы перечисления

            EnumType digit = EnumType.zero;
            Console.WriteLine(digit);               // имя константы перечисления
            Console.WriteLine((byte)digit);         // значение константы перечисления

            Console.ReadKey();
        }
    }
}
