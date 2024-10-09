using System;
using System.Collections;

namespace Lessons_12
{
    class MyClass
    {
        public int MyIntProperty { get; set; }
        public string MyStringProperty { get; set; }
    }

    class Program
    {
        static void Main()
        {
            ArrayList arrayList = new ArrayList();
            arrayList.Add(0);
            arrayList.Add(0.67);
            arrayList.Add('a');
            arrayList.Add("elem");
            arrayList.Add(new MyClass());

            for (int i = 0; i < arrayList.Count; i++)
            {
                Console.WriteLine(arrayList[i]);
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
