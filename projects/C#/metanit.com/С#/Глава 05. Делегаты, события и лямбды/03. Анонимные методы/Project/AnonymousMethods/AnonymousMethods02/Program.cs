/*2022.10.11 10:58 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnonymousMethods02
{
    //Другой пример анонимных методов - передача в качестве аргумента для параметра,
    //который представляет делегат:

    class Program
    {
        delegate void MessageHandler(string message);

        static void Main(string[] args)
        {
            ShowMessage("hello!", delegate (string mes)
            {
                Console.WriteLine(mes);
            });

            Console.Read();
        }
        static void ShowMessage(string mes, MessageHandler handler)
        {
            handler(mes);
        }
    }
}
