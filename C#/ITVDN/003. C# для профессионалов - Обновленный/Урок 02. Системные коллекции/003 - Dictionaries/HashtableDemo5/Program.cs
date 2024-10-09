/*2022.10.18 10:13 IMM*/
using System;
using System.Collections;

namespace HashtableDemo5
{
    public class Fish
    {
        private readonly string name;

        public Fish(string name)
        {
            this.name = name;
        }

        /*
            переопределение метода GetHashCode() - хеш вычисляется на строковом поле 
            name. Если строки одинаковые, то у них одинаковые хеш значения.
        */
        public override int GetHashCode()
        {
            return name.GetHashCode();
        }

        /*
            переопределение метода сравнения двух объектов. Нужно, чтобы не только строки
            были одинаковые, но и поля, содержащие эти строки, принадлежали объектам одного
            класса.
        */
        public override bool Equals(object obj)
        {
            var otherFish = obj as Fish;

            if (otherFish == null)
            {
                return false;
            }

            return otherFish.name == name;
        }
    }

    class Program
    {
        static void Main()
        {
            var duplicates = new Hashtable();

            var key1 = new Fish("Herring");
            var key2 = new Fish("Herring");

            duplicates[key1] = "Hello";
            duplicates[key2] = "Hello2";

            Console.WriteLine(duplicates.Count);

            // Delay.
            Console.ReadKey();
        }
    }
}
