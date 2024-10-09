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
            bool operand1 = false, operand2 = false, result = false;

            #region конъюнкция

            operand1 = true;               
            operand2 = false;            

            result = operand1 && operand2;  

            Console.WriteLine("{0} AND {1} = {2}", operand1, operand2, result);

            #endregion

            #region дизъюнкция

            operand1 = true;              
            operand2 = false;              

            result = operand1 || operand2;  

            Console.WriteLine("{0} OR {1} = {2}", operand1, operand2, result);

            #endregion

            #region исключающее или

            operand1 = true;           
            operand2 = false;           

            result = operand1 ^ operand2; 

            Console.WriteLine("{0} XOR {1} = {2}", operand1, operand2, result);

            #endregion

            #region отрицание 

            operand1 = true;              
            result = !operand1;           

            Console.WriteLine(" NOT {0} = {1}", operand1, result);

            #endregion

            Console.ReadKey();
             
        }
    }
}
