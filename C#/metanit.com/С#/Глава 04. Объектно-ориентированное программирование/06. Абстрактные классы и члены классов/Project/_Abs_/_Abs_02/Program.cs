/*2022.01.10 21:15 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _Abs_02
{
    //Выше писалось, что мы не можем использовать конструктор абстрактного класса
    //для создания экземпляра этого класса. Тем не менее такой класс также может 
    //определять конструкторы:

    abstract class Transport
    {
        // свойство
        public string Name { get; }

        // конструктор абстрактного класса Transport
        public Transport(string name)
        {
            Name = name;
        }

        /*
        Специальный знак $ идентифицирует строковый литерал как интерполированную 
        строку, т. е. в результате получается строковый литерал, который может 
        содержать выражения интерполяции. При разрешении интерполированной строки
        в результирующую элементы с выражениями интерполяции заменяются строковыми
        представлениями результатов выражений. В C# версии 6 эта функция была 
        добавлена впервые.

        Интерполяция строк предоставляет более понятный и удобный синтаксис для 
        создания форматированных строк по сравнению с функцией составного
        форматирования строк. 
        */
        public void Move() => Console.WriteLine($"{Name} движется");
    }
    // класс корабля
    class Ship : Transport
    {
        // вызываем конструктор базового класса
        public Ship(string name) : base(name) { }
    }
    // класс самолета
    class Aircraft : Transport
    {
        public Aircraft(string name) : base(name) { }
    }
    // класс машины
    class Car : Transport
    {
        public Car(string name) : base(name) { }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Transport car = new Car("машина");
            Transport ship = new Ship("корабль");
            Transport aircraft = new Aircraft("самолет");

            car.Move();         // машина движется
            ship.Move();        // корабль движется
            aircraft.Move();    // самолет движется

            Console.ReadKey();
        }
    }
}
/*
В данном случае в абстрактном классе Transport определен конструктор - с помощью
параметра он устанавливает значение свойства Name, которое хранит название 
транспортного средства. И в этом случае производные классы должны в своих 
конструкторах вызвать этот конструктор.
*/
