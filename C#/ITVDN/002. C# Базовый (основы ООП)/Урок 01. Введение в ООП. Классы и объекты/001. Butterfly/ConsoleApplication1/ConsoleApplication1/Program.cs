using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class Butterfly
    {
        public string name;

        public void Fly()
        {
            for (int i = 0; i < 10; i++)
                Console.WriteLine("Fly!");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Butterfly mahaon = new Butterfly();
            mahaon.name = "Admiral";
            mahaon.Fly();

            Console.ReadLine();
        }
    }
}
