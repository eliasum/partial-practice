
extern alias T2;


namespace Namespaces
{
    class Program
    {
        static void Main()
        {
            T2.Task_2_1.MyClass my = new T2.Task_2_1.MyClass();

            my.Method();

            // Delay.
            System.Console.ReadKey();
        }
    }
}
