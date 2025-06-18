using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/*
    2022.06.03 14:43 IMM

    BinaryReader

    Для создания объекта BinaryReader можно применять ряд конструкторов. Возьмем 
    наиболее простую версию:

    Reader(Stream stream)

    в его конструктор также передается объект Stream (также обычно это объект FileStream).

    Основные методы класса BinaryReader

        Close(): закрывает поток и освобождает ресурсы

        ReadBoolean(): считывает значение bool и перемещает указатель на один байт

        ReadByte(): считывает один байт и перемещает указатель на один байт

        ReadChar(): считывает значение char, то есть один символ, и перемещает 
        указатель на столько байтов, сколько занимает символ в текущей кодировке

        ReadDecimal(): считывает значение decimal и перемещает указатель на 16 байт

        ReadDouble(): считывает значение double и перемещает указатель на 8 байт

        ReadInt16(): считывает значение short и перемещает указатель на 2 байта

        ReadInt32(): считывает значение int и перемещает указатель на 4 байта

        ReadInt64(): считывает значение long и перемещает указатель на 8 байт

        ReadSingle(): считывает значение float и перемещает указатель на 4 байта

        ReadString(): считывает значение string. Каждая строка предваряется 
        значением длины строки, которое представляет 7-битное целое число

    С чтением бинарных данных все просто: соответствующий метод считывает данные 
    определенного типа и перемещает указатель на размер этого типа в байтах, 
    например, значение типа int занимает 4 байта, поэтому BinaryReader считает 
    4 байта и переместит указатель на эти 4 байта.

    Например, выше в примере с BinaryWriter в файл person.dat записывалась 
    строка и число. Считаем их с помощью BinaryReader:
*/

namespace binary2
{
    class Program
    {
        static void Main(string[] args)
        {
            using (BinaryReader reader = new BinaryReader(File.Open("person.dat", FileMode.Open)))
            {
                // считываем из файла строку
                string name = reader.ReadString();

                // считываем из файла число 
                //int age = reader.ReadInt32();
                int age = reader.ReadByte();
                Console.WriteLine($"Name: {name}  Age: {age}");

                Console.ReadKey();
            }
        }
    }
}
/*
    Конструктор класса BinaryReader также в качестве параметра принимает объект потока, 
    только в данном случае устанавливаем в качестве режима FileMode.Open: 
    new BinaryReader(File.Open("person.dat", FileMode.Open)).

    В каком порядке данные были записаны в файл, в таком порядке мы их можем оттуда 
    считать. То есть если сначала записывалась строка, а потом число, то в данном 
    порядке мы их можем считать из файла.
*/
