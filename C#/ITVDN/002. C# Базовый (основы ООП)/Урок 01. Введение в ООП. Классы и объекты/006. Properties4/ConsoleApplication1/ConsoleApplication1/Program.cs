using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// Классы. Свойства с одним методом доступа.

namespace ConsoleApplication1
{
    class Constants
    {
        private double pi = 3.14D;
        private double e = 2.71D;

        // Свойство только для записи - WriteOnly Property
        public double Pi
        {
            set { pi = value; }
        }

        // Свойство только для чтения - ReadOnly Property
        public double E
        {
            get { return e; }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Constants constants = new Constants();

            constants.Pi = 3.14159265D;
            //Console.WriteLine(constants.Pi);  // Недопустимо

            //constants.E = 2.71D;              // Недопустимо
            Console.WriteLine("e = {0}", constants.E);

            Console.ReadKey();
        }
    }
}
