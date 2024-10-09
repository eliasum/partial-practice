namespace Lessons_17
{
    class Point
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Z { get; set; }

        public Point()
        {

        }

        public static Point operator +(Point p1, Point p2)
        {
            return new Point(p1.X + p2.X, p1.Y + p2.Y, p1.Z + p2.Z);
        }

        public Point(int x, int y, int z)
        {
            X = x;
            Y = y;
            Z = z;
        }
    }
}
