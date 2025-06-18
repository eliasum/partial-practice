/*2022.01.10 22:46 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _Abs_06
{
    /*
    Пример абстрактного класса

    Xрестоматийным примером является система геометрических фигур. В реальности не 
    существует геометрической фигуры как таковой. Есть круг, прямоугольник, квадрат, 
    но просто фигуры нет. Однако же и круг, и прямоугольник имеют что-то общее и 
    являются фигурами:
    */
    // абстрактный класс фигуры
    abstract class Shape
    {
        // абстрактный метод для получения периметра
        public abstract double GetPerimeter();
        // абстрактный метод для получения площади
        public abstract double GetArea();
    }

    // производный класс прямоугольника
    class Rectangle : Shape
    {
        // автосвойства
        public float Width { get; set; }
        public float Height { get; set; }

        // переопределение получения периметра
        public override double GetPerimeter() => Width * 2 + Height * 2;
        // переопрелеление получения площади
        public override double GetArea() => Width * Height;
    }

    // производный класс окружности
    class Circle : Shape
    {
        // автосвойство
        public double Radius { get; set; }

        // переопределение получения периметра
        public override double GetPerimeter() => Radius * 2 * 3.14;
        // переопрелеление получения площади
        public override double GetArea() => Radius * Radius * 3.14;
    }

    class Program
    {
        static void Main(string[] args)
        {
            void PrintShape(Shape shape)
            {
                Console.WriteLine($"Perimeter: {shape.GetPerimeter()}  Area: {shape.GetArea()}");
            }

            var rectanle = new Rectangle { Width = 20, Height = 20 };
            var circle = new Circle { Radius = 200 };

            PrintShape(rectanle);       // Perimeter: 80   Area: 400
            PrintShape(circle);         // Perimeter: 1256  Area: 125600

            Console.ReadKey();
        }
    }
}
