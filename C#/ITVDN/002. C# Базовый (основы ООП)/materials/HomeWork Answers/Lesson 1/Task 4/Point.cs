
namespace Task_4
{
    class Point
    {
        string name;

        public string Name
        {
            get { return name; }
        }

        int x, y;

        public int X
        {
            get { return x; }
        }

        public int Y
        {
            get { return y; }
        }

        public Point(string name, int x, int y)
        {
            this.name = name;
            this.x = x;
            this.y = y;
        }
    }
}
