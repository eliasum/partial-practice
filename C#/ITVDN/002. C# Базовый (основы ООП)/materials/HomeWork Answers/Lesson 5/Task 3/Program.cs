using System;

namespace Task_3
{
    class Program
    {
        static void Main()
        {
            MyMatrix m = new MyMatrix(4, 5);
            m.Show();

            Console.WriteLine(new string('-', 30));
            Console.WriteLine("[1][2] = {0}", m[1, 2]);
            Console.WriteLine("[6][2] = {0}", m[6, 2]);
            m[0, 0] = 11;

            Console.WriteLine(new string('-', 30));
            m.ChengeSize(7, 6);
            m.Show();

            Console.WriteLine(new string('-', 30));
            m.ShowPartly(1, 0, 4, 4);

            //Delay
            Console.ReadKey();
        }
    }
}
