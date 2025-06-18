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

            for (int i = 0; i < 10; i++)
            {
                // выводим одну строку из 10 звездочек.
                for (int j = 0; j < 10; j++)
                {
                    Console.Write("*");
                }

                // переход на новую строку
                Console.WriteLine();
            }

            Console.ReadKey();
        }
    }
}
