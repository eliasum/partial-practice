using System;

namespace Lessons_17
{
    class Program
    {
        static void Main()
        {

            Point a = new Point(1, 1, 1);
            Point b = new Point(2, 2, 2);

            Point c = a + b;

            Console.WriteLine("Координаты точки с равны "+c.X+" "+c.Y+" "+c.Z);

            // Delay.
            Console.ReadKey();
        }
    }
}
