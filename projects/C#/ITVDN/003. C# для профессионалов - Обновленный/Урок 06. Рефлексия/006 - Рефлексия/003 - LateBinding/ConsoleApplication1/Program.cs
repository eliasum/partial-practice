﻿/*2024.12.10 18:14 IMM*/

using System;
using System.IO;
using System.Reflection;

using CarLibrary;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main()
        {
            Assembly assembly = null;

            try
            {
                assembly = Assembly.Load("CarLibrary");

                Type type = assembly.GetType("CarLibrary.MiniVan");

                ICar carInstance = Activator.CreateInstance(type) as ICar; // as - оператор безопасного приведения типа

                if (carInstance != null)
                {
                    carInstance.Acceleration();
                    carInstance.Driver("Shumaher", 26);
                }

            }
            catch (FileNotFoundException e)
            {
                Console.WriteLine(e.Message);
            }
           
            // Delay.
            Console.ReadKey();
        }
    }
}
