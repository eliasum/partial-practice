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
            byte operand1 = 0, operand2 = 0;

            int result;

            #region конъюнкция

            operand1 = 0xFF;               // 1111 1111
            operand2 = 0x01;               // 0000 0001

            result = operand1 & operand2;  // 0000 0001

            Console.WriteLine("{0} AND {1} = {2}", operand1, operand2, result);

            #endregion

            #region дизъюнкция

            operand1 = 0x02;               // 0000 0010
            operand2 = 0x01;               // 0000 0001

            result = operand1 | operand2;  // 0000 0011

            Console.WriteLine("{0} OR {1} = {2}", operand1, operand2, result);

            #endregion

            #region исключающее или

            operand1 = 0x03;               // 0000 0011
            operand2 = 0x01;               // 0000 0001

            result = operand1 ^ operand2;  // 0000 0010

            Console.WriteLine("{0} XOR {1} = {2}", operand1, operand2, result);

            #endregion

            #region отрицание 

            operand1 = 0x01;               // 0000 0001 = 1
            result = ~operand1;            // 1111 1110 = -2

            Console.WriteLine(" NOT {0} = {1}", operand1, result);

            #endregion

            #region изменение знака числа

            operand1 = 0x01;               // 0000 0001 = 1
            result = ~operand1;            // 1111 1110 = -2
            result++;                      // 1111 1111 = -1

            Console.WriteLine(" ~ {0} + 1 = {1}", operand1, result);

            #endregion

            Console.ReadKey();
             
        }
    }
}
