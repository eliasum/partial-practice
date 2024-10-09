using System;

namespace Task_2
{
    class Program
    {
        static void Main()
        {
            Console.WriteLine("Введите превую сторону прямоугольника");
            double side1 = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("Введите вторую сторону прямоугольника");
            double side2 = Convert.ToDouble(Console.ReadLine());

            Rectangle rectangle = new Rectangle(side1, side2);
            Console.WriteLine("Perimeter = {0}, Area= {1}", rectangle.Perimeter, rectangle.Area);

            // Delay.
            Console.ReadKey();
        }
    }
}
