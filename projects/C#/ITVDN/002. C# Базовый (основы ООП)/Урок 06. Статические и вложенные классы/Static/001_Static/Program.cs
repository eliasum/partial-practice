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
            private int Id;
            public static int field;

            public NotStaticClass(int Id)
            {
                this.Id = Id;
            }

            public void Method()
            {
                Console.WriteLine("Instance{0}.field = {1}", Id, field);
            }
        }


        static void Main(string[] args)
        {
            NotStaticClass instance1 = new NotStaticClass(1);
            NotStaticClass instance2 = new NotStaticClass(2);

            instance1.Method();
            instance2.Method();

            // на классе-объекте NotStaticClass обращаемся к статическому полю field
            NotStaticClass.field = 1;  // обращение к статическим полям

            instance1.Method();
            instance2.Method();

            Console.ReadKey();

        }
    }
}
