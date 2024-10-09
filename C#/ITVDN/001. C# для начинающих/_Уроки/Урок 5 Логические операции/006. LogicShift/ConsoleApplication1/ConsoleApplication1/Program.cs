using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
        
namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            byte operand = 0x81;   // 1000 0001
            Console.WriteLine("Число до сдвига: {0:X}", operand);

            // логический сдвиг числа влево

            operand = (byte)(operand << 2);   // 0000 0100
            Console.WriteLine("Число после сдвига влево: {0:X}", operand);

            // логический сдвиг числа вправо

            operand = (byte)(operand >> 1);   // 0000 0010
            Console.WriteLine("Число после сдвига вправо: {0:X}", operand);

            Console.ReadKey();
             
        }
    }
}
