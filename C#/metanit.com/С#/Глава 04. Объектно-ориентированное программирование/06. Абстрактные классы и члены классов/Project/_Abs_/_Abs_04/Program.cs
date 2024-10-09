/*2022.01.10 21:55 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _Abs_04
{
    /*
    Абстрактные свойства

    Следует отметить использование абстрактных свойств. Их определение похоже на 
    определение автосвойств. Например:
    */

    abstract class Transport
    {
        // абстрактное свойство для хранения скорости
        public abstract int Speed { get; set; }
    }
    // класс корабля
    class Ship : Transport
    {
        int speed;
        public override int Speed
        {
            get => speed;
            set => speed = value;
        }

        /*
        public override int Speed
        {
            get { return speed; }
            set { speed = value; }
        }
        */
    }

    class Aircraft : Transport
    {
        public override int Speed { get; set; }
    }

    /*
    В классе Transport определено абстрактное свойство Speed, которое должно хранить
    скорость транспортного средства. Оно похоже на автосвойство, но это не автосвойство.
    Так как данное свойство не должно иметь реализацию, то оно имеет только пустые
    блоки get и set. В производных классах мы можем переопределить это свойство, сделав
    его полноценным свойством (как в классе Ship), либо же сделав его автоматическим
    (как в классе Aircraft).
    */

    class Program
    {
        static void Main(string[] args)
        {
        }
    }
}
