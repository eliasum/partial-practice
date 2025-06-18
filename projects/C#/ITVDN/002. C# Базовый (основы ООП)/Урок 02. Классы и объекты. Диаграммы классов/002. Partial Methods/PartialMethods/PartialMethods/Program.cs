using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Classes
{
    class Program
    {
        static void Main(string[] args)
        {
            PartialClass instance = new PartialClass();

            instance.CallPartialMethod();

            Console.ReadKey();
        }
    }
}
