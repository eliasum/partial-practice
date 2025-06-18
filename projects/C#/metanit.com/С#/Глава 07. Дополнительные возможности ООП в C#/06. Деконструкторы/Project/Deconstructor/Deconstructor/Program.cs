//Деконструкторы

//Деконструкторы(не путать с деструкторами) позволяют выполнить декомпозицию 
//объекта на отдельные части.

//Например, пусть у нас есть следующий класс Person:

using System;

namespace Deconstructor
{
    class Person
    {
        public string Name { get; set; }
        public int Age { get; set; }

        public void Deconstruct(out string name, out int age)
        {
            name = this.Name;
            age = this.Age;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            //В этом случае мы могли бы выполнить декомпозицию объекта Person так:
            //Person person = new Person { Name = "Tom", Age = 33 };

            //(string name, int age) = person;

            //Console.WriteLine(name);    // Tom
            //Console.WriteLine(age);     // 33

            //Console.ReadKey();

            //По сути деконструкторы это не более, чем синтаксический сахар. 
            //Это все равно, что если бы мы написали в предыдущих версиях C#
            //следующий набор выражений:

            Person person = new Person { Name = "Tom", Age = 33 };

            string name; int age;

            person.Deconstruct(out name, out age);

            Console.WriteLine(name);    // Tom
            Console.WriteLine(age);     // 33

            Console.ReadKey();

            //При использовании деконструкторов следует учитывать, что метод 
            //Deconstruct должен принимать как минимум два выходных параметра. То
            //есть следующее определение метода работать не будет:

            //public void Deconstruct(out string name)
            //{
            //    name = this.Name;
            //}
        }
    }
}







