namespace Task_2
{
    class Rectangle
    {
        double side1, side2;

        /// <summary>
        /// Построение прямоугольника.
        /// </summary>
        /// <param name="side1">Длина первой стороны</param>
        /// <param name="side2">Длина второй стороны</param>
        public Rectangle(double side1, double side2)
        {
            this.side1 = side1;
            this.side2 = side2;
        }

        /// <summary>
        /// Расчет периметра.
        /// </summary>
        /// <returns>Периметр</returns>
        /// 
        double PerimeterCalculator()
        {
            return (side1 + side2) * 2;
        }
        public double Perimeter
        {
            get
            {
                return this.PerimeterCalculator();
            }
        }

        /// <summary>
        /// Расчет площади
        /// </summary>
        /// <returns>Площадь</returns>
        /// 
        double AreaCalculator()
        {
            return side1 * side2;
        }

        public double Area
        {
            get
            {
                return this.AreaCalculator();
            }
        }
    }
}
