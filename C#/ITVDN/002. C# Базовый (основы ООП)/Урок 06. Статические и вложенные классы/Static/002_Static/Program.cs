using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// статические члены в нестатических классах

namespace Static
{
    class Program
    {
        class NotStaticClass
        {
            private int id;

            public NotStaticClass(int id)
            {
                this.id = id;
            }

            public static void Method()
            {
                //Console.WriteLine("Instance.id = {0}", id);
                Console.WriteLine("В статических методах нельзя обращаться к нестатическим полям.");
            }
        }


        static void Main(string[] args)
        {
            NotStaticClass instance1 = new NotStaticClass(1);
            NotStaticClass instance2 = new NotStaticClass(2);

            Console.ReadKey();

        }
    }
}
