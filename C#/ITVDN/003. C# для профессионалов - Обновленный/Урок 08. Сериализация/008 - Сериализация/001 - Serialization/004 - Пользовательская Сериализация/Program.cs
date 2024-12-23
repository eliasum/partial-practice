/*2024.12.23 10:20 IMM*/

using System;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

// ���������������� ������������.

namespace UserSerialWork
{
    class Program
    {
        static void Main()
        {
            Car car = new Car("Mersedes-Benz", 250);
            Stream stream = File.Create("CarData.dat");
                        
            BinaryFormatter formatter = new BinaryFormatter();

            // ������������ (����� ������ ISerializable.GetObjectData()).
            formatter.Serialize(stream, car); 
            stream.Close();

            stream = File.OpenRead("CarData.dat");

            // �������������� (����� ����������������).
            car = formatter.Deserialize(stream) as Car;

            Console.WriteLine(car.name + "\n" + car.speed);

            // ��������. 
            Console.ReadKey();
        }
    }
}
