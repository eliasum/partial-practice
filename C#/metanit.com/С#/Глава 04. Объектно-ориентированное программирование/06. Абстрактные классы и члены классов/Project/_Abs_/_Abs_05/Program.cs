/*2022.01.10 22:07 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _Abs_05
{
    /*
    Отказ от реализации абстрактных членов

    Производный класс обязан реализовать все абстрактные члены базового класса. 
    Однако мы можем отказаться от реализации, но в этом случае производный класс
    также должен быть определен как абстрактный:
    */

    abstract class Transport
    {
        public abstract void Move();
    }
    // класс машины
    abstract class Car : Transport { }

    class Auto : Car
    {
        public override void Move()
        {
            Console.WriteLine("легковая машина едет");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Transport tesla = new Auto();
            tesla.Move();           // легковая машина едет

            Console.ReadKey();
        }
    }
}
/*
В данном случае класс Car не реализует абстрактный метод Move базового класса 
Transport и поэтому также определен как абстрактный. Однако любые неабстрактные 
классы, производные от Car, все равно должны реализовать все унаследованные 
абстрактные методы и свойства.
*/
