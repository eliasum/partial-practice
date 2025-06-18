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

            // условие, которое НЕ работает с использованием техники КОРОТКОЗАМКНУТОГО ВЫЧИСЛЕНИЯ.
            // из-за того, что операция AND вычисляется слева направо,
            // данное логически эквивалентное выражение работать не будет!

            if(((item/denominator) > MIN_VALUE)&&(denominator !=0 )) // оставьте один оператор &
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
