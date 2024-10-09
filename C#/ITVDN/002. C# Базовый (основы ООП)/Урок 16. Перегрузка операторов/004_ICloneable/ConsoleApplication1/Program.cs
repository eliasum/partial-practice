/*2022.10.10 11:30 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    public class IdInfo
    {
        public int IdNumber;

        public IdInfo(int IdNumber)
        {
            this.IdNumber = IdNumber;
        }
    }

    public class Person
    {
        public int Age;
        public string Name;
        public IdInfo IdInfo;

        // поверхностное копирование
        public Person ShallowCopy()
        {
            return (Person)this.MemberwiseClone();
        }

        // глубокое копирование
        public Person DeepCopy()
        {
            Person other = (Person)this.MemberwiseClone();
            other.IdInfo = new IdInfo(IdInfo.IdNumber);
            other.Name = String.Copy(Name);
            return other;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // Создаем экземпляр Person и присваиваем значения его полям.
            // Create an instance of Person and assign values to its fields.
            Person p1 = new Person();
            p1.Age = 42;
            p1.Name = "Sam";
            p1.IdInfo = new IdInfo(6565);

            // Выполнить поверхностную копию p1 и присвоить ее p2.
            // Perform a shallow copy of p1 and assign it to p2.
            Person p2 = p1.ShallowCopy();

            // Display values of p1, p2
            Console.WriteLine("Original values of p1 and p2:");
            Console.WriteLine("   p1 instance values: ");
            DisplayValues(p1);
            Console.WriteLine("   p2 instance values:");
            DisplayValues(p2);

            // Изменяем значение свойств p1 и отображаем значения p1 и p2.
            // Change the value of p1 properties and display the values of p1 and p2.
            /*
                после изменения id у p1, id у p2 так же поменялось, т.к. при поверхностном
                копировании копируется класс Person и не копируется класс IdInfo, а ссылается
                на старый экземпляр класса IdInfo
            */
            p1.Age = 32;
            p1.Name = "Frank";
            p1.IdInfo.IdNumber = 7878;
            Console.WriteLine("\nValues of p1 and p2 after changes to p1:");
            Console.WriteLine("   p1 instance values: ");
            DisplayValues(p1);
            Console.WriteLine("   p2 instance values:");
            DisplayValues(p2);

            // Делаем глубокую копию p1 и назначаем ее p3.
            // Make a deep copy of p1 and assign it to p3.
            Person p3 = p1.DeepCopy();
            // Изменить члены класса p1 на новые значения, чтобы отобразить глубокую копию.
            // Change the members of the p1 class to new values to show the deep copy.
            /*
                после изменения id у p1, id у p2 НЕ поменялось, т.к. при глубоком
                копировании копируется класс Person и копируется класс IdInfo:
                other.IdInfo = new IdInfo(IdInfo.IdNumber);
                а не ссылается на старый экземпляр класса IdInfo
            */
            p1.Name = "George";
            p1.Age = 39;
            p1.IdInfo.IdNumber = 8641;
            Console.WriteLine("\nValues of p1 and p3 after changes to p1:");
            Console.WriteLine("   p1 instance values: ");
            DisplayValues(p1);
            Console.WriteLine("   p3 instance values:");
            DisplayValues(p3);

            Console.ReadKey();
        }

        public static void DisplayValues(Person p)
        {
            Console.WriteLine("      Name: {0:s}, Age: {1:d}", p.Name, p.Age);
            Console.WriteLine("      Value: {0:d}", p.IdInfo.IdNumber);
        }
    }
}
