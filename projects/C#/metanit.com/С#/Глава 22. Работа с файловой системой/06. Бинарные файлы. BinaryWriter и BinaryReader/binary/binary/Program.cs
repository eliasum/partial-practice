using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/*
    2022.06.02 16:02 IMM

    Бинарные файлы. BinaryWriter и BinaryReader
    
    Для работы с бинарными файлами предназначена пара классов BinaryWriter и BinaryReader.
    Эти классы позволяют читать и записывать данные в двоичном формате.

    BinaryWriter

    Для создания объекта BinaryWriter можно применять ряд конструкторов. Возьмем наиболее простую:

    BinaryWriter(Stream stream)

    в его конструктор передается объект Stream (обычно это объект FileStream).

    Основные методы класса BinaryWriter

    Close(): закрывает поток и освобождает ресурсы

    Flush(): очищает буфер, дописывая из него оставшиеся данные в файл

    Seek(): устанавливает позицию в потоке

    Write(): записывает данные в поток. В качестве параметра этот метод может принимать значения примитивных данных:

        Write(bool)

        Write(byte)

        Write(char)

        Write(decimal)

        Write(double)

        Write(Half)

        Write(short)

        Write(int)

        Write(long)

        Write(sbyte)

        Write(float)

        Write(string)

        Write(ushort)

        Write(uint)

        Write(ulong)

    Либо можно передать массивы типов byte и char

        Write(byte[])

        Write(char[])

        Write(ReadOnlySpan<byte>)

        Write(ReadOnlySpan<char>)

    При записи массива дополнительно можно указать, с кого элемента массива надо выполнять запись, а также число записываемых элементов массива:

        Write(byte[], int, int)

        Write(char[], int, int)

    Рассмотрим простейшую запись бинарного файла:
*/

namespace binary
{
    class Program
    {
        static void Main(string[] args)
        {
            string path = "person.dat";                 // файл

            if (File.Exists(path)) File.Delete(path);   // удалить файл если существует

            // создаем объект BinaryWriter
            using (BinaryWriter writer = new BinaryWriter(File.Open(path, FileMode.OpenOrCreate)))
            {
                // записываем в файл строку

                // https://www.cyberforum.ru/csharp-beginners/thread634522.html
                //writer.Write(Encoding.GetEncoding(866).GetBytes("Tom"));
                //writer.Write(Encoding.GetEncoding(0).GetBytes("Tom"));

                // изначальная строка кода
                writer.Write("Tom");

                // записываем в файл число sbyte или byte, чтобы в файле не было нулей
                writer.Write((byte)37);
                Console.WriteLine("File has been written");
            }

            Console.ReadKey();

            /*
                В данном случае последовательно сохраняем в файл people.dat данные 
                объектов Person из массива people.
            */
        }
    }
}
