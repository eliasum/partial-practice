using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Loop
{
    class Program
    {
        static void Main(string[] args)
        {
            // for (инициализация счетчика итераций; условие; изменение счетчика) {тело цикла}

            for (int counter = 0; counter < 3; counter++)
            {
                Console.WriteLine("Counter = {0}", counter);

                break;

                Console.WriteLine("Эта строка не выполнится.");
            }

            //counter = 0; // counter недоступен за пределами цикла for

            Console.ReadKey();
        }
    }
}
