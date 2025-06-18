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
            // КОРОТКОЗАМКНУТОЕ ВЫЧИСЛЕНИЕ - техника, работающая по следующему принципу:
            // если значение первого операнда в операции AND (&&) ложно, то второй операнд не вычисляется,
            // потому, что полное выражение в любом случае будет ложным

            int MIN_VALUE = 1;
            int denominator = 0;  // делитель
            int item = 2;

            // условие, которое работает с использованием техники КОРОТКОЗАМКНУТОГО ВЫЧИСЛЕНИЯ.
            // если бы это выражение вычислялось полностью, то операция деления во втором операнде
            // генерировала бы ошибку деления на ноль

            if((denominator !=0 )&&(item/denominator) > MIN_VALUE) // оставьте один оператор &
            {
               Console.WriteLine("Мы в блоке IF");
            }
            else
            {
               Console.WriteLine("Мы в блоке ELSE");
            }

            Console.ReadKey();
             
        }
    }
}
