using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace task2
{
    class Rectangle
    {
        double side1, side2;

        public double Side1 { get => side1; set => side1 = value; }
        public double Side2 { get => side2; set => side2 = value; }

        public Rectangle(double side1, double side2)
        {
            this.side1 = side1;
            this.side2 = side2;
        }

        private double AreaCalculatior()
        {
            return (side1 * side2);
        }

        private double PerimeterCalculatior()
        {
            return (2*side1 + 2*side2);
        }

        public double Area
        {
            get { return AreaCalculatior(); }
        }

        public double Perimeter
        {
            get { return PerimeterCalculatior(); }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Rectangle rec = new Rectangle(10.0, 15.0);

            Console.WriteLine("Area = {0}, Perimeter = {1}", rec.Area, rec.Perimeter);

            Console.ReadKey();
        }
    }
}
