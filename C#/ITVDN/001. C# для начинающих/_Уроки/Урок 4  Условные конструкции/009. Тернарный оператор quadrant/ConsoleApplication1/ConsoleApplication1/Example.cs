using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class Example
    {
        static void Main(string[] args)
        {
            // определение квадранта, в котором лежит заданная точка
            // для упрощения примера условимся, что точка не будет лежать в центре координат и на координатных осях,
            // это значит, что x и y - не могут быть равны нулю.

            int x = 10, y = -5;

            // не рекомендуется вкладывать тернарные операторы, так как это ухудшает чтение кода

            string quadrant = (x > 0) ? ((y > 0) ? "I квадрант" : "IV квадрант") : ((y > 0) ? "II квадрант" : "III квадрант");

            // ... или так 

            quadrant = x > 0 ? (y > 0 ? "I квадрант" : "IV квадрант") : (y > 0 ? "II квадрант" : "III квадрант");

            // ... или вообще, вот так 

            quadrant = x > 0 ? y > 0 ? "I квадрант" : "IV квадрант" : y > 0 ? "II квадрант" : "III квадрант";

            Console.WriteLine(quadrant);

            Console.ReadKey();
        }
    }
}