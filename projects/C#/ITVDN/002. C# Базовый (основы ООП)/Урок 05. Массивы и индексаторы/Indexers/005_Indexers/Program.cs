/*2022.10.13 14:55 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _005_Indexers
{
    class Dictionary
    {
        private string[] key = new string[5];
        private string[] value = new string[5];

        // конструктор класса Dictionary
        public Dictionary()
        {
            key[0] = "книга"; value[0] = "book"; 
            key[1] = "ручка"; value[1] = "pen";
            key[2] = "солнце"; value[2] = "sun";
            key[3] = "яблоко"; value[3] = "apple";
            key[4] = "стол"; value[4] = "table";
        }

        /*
        Индексаторы отличаются друг от друга только типом и количеством индексов 

        index - русское слово из словаря

        индексатор для вывода перевода русского слова на английский по строковому индексу

        по этому индексатору доступ к переводу русского слова на английский, входной 
        параметр - index (русское слово из словаря)
        */
        public string this[string index]
        {
            get
            {
                for(int i=0; i< key.Length; i++)
                {
                    if (key[i] == index)
                        return key[i] + " - " + value[i];
                }
                return string.Format("{0} - нет перевода для этого слова.", index);
            }   
        }

        // индексатор для вывод записи из словаря по целочисленному индексу
        public string this[int index]
        {
            get
            {
                if (index >= 0 && index < key.Length)
                    return key[index] + " - " + value[index];

                else return "Попытка обращения за пределы массива";
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Dictionary dictionary = new Dictionary();

            // вывод перевода по строковому индексу
            Console.WriteLine(dictionary["книга"]);
            Console.WriteLine(dictionary["дом"]);
            Console.WriteLine(dictionary["ручка"]);
            Console.WriteLine(dictionary["стол"]);
            Console.WriteLine(dictionary["карандаш"]);
            Console.WriteLine(dictionary["яблоко"]);
            Console.WriteLine(dictionary["солнце"]);

            Console.WriteLine(new string('-',20));

            // вывод перевода по целочисленному индексу
            for (int i=0; i<6; i++)
            {
                Console.WriteLine(dictionary[i]);
            }

            Console.ReadKey(); 
        }
    }
}
