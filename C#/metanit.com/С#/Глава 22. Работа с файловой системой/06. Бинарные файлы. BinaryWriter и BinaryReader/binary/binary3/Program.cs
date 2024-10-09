using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/*
    2022.06.03 14:43 IMM

    Или подобным образом считаем данные из файла people.dat, который 
    был записан в примере выше и который содержит данные объектов Person:
*/

namespace binary3
{
    class Person
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public Person(string name, int age)
        {
            Name = name;
            Age = age;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // список для считываемых данных
            List<Person> people = new List<Person>();

            // создаем объект BinaryWriter
            using (BinaryReader reader = new BinaryReader(File.Open("person.dat", FileMode.Open)))
            {
                // пока не достигнут конец файла
                // считываем каждое значение из файла
                while (reader.PeekChar() > -1)
                {
                    string name = reader.ReadString();
                    //int age = reader.ReadInt32();
                    int age = reader.ReadByte();
                    // по считанным данным создаем объект Person и добавляем в список
                    people.Add(new Person(name, age));
                }
            }
            // выводим содержимое списка people на консоль
            foreach (Person person in people)
            {
                Console.WriteLine($"Name: {person.Name}  Age: {person.Age}");
            }

            Console.ReadKey();
        }
    }
}
/*
    Здесь в цикле while считываем данные. Чтобы узнать окончание потока, вызываем метод PeekChar().
    Этот метод считывает следующий символ и возвращает его числовое представление. Если символ 
    отсутствует, то метод возвращает -1, что будет означать, что мы достигли конца файла.

    В цикле последовательно считываем значения для свойств объектов Person в том же порядке, 
    в каком они записывались.
*/
