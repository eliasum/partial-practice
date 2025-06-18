using System;
using System.Threading;

namespace Task_1
{
    class Program
    {
        static void Main()
        {
            Console.SetWindowSize(80, 40);

            Matrix instance;
            
            for (int i = 0; i < 30; i++)
            {
                instance = new Matrix(i * 2);
                new Thread(instance.Move).Start();
            }


            Console.ReadKey();
        }
    }
}
